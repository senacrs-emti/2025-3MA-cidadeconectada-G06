// =============================
// Mapa centralizado em Porto Alegre
// =============================
const map = L.map('map').setView([-30.0346, -51.2177], 13);

// Adiciona o mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// =============================
// Controle do modo de marcação
// =============================
let addingMarkers = false;
const toggleAddButton = document.getElementById('toggleAddButton');

// Quando o botão é clicado, ativa/desativa o modo de marcação
toggleAddButton.addEventListener('click', () => {
  addingMarkers = !addingMarkers;
  if (addingMarkers) {
    toggleAddButton.classList.add('active');
    toggleAddButton.textContent = 'Desativar modo de marcação';
  } else {
    toggleAddButton.classList.remove('active');
    toggleAddButton.textContent = 'Ativar modo de marcação';
  }
});

// =============================
// Lista de marcadores (local e do BD)
// =============================
let markers = [];

// =============================
// Função para carregar pontos do banco (PHP → JSON)
// =============================
async function carregarPontos() {
  try {
    const response = await fetch('..php/listar_pontos.php');
    const pontos = await response.json();

    pontos.forEach((p, i) => {
      const marker = L.marker([p.latitude, p.longitude]).addTo(map);
      markers.push(marker);

      marker.bindPopup(`
        <b>Problema informado:</b><br>
        ${p.descricao}<br><br>
        <b>Coordenadas:</b><br>
        ${p.latitude.toFixed(4)}, ${p.longitude.toFixed(4)}<br><br>
        <button onclick="removeMarker(${i}, ${p.id})">Remover ponto</button>
        <button onclick="reportIssue('${encodeURIComponent(p.descricao)}', ${p.latitude}, ${p.longitude})">Denunciar</button>
      `);
    });
  } catch (error) {
    console.error("Erro ao carregar pontos:", error);
  }
}

// =============================
// Função para adicionar novo marcador
// =============================
map.on('click', async function (e) {
  if (!addingMarkers) return; // só marca se o modo estiver ativo

  const { lat, lng } = e.latlng;
  const descricao = prompt("Descreva o problema de acessibilidade neste local:");

  if (!descricao) return;

  // Cria o marcador no mapa
  const marker = L.marker([lat, lng]).addTo(map);
  markers.push(marker);

  marker.bindPopup(`
    <b>Problema informado:</b><br>
    ${descricao}<br><br>
    <b>Coordenadas:</b><br>
    ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><br>
    <button onclick="removeMarker(${markers.length - 1})">Remover ponto</button>
    <button onclick="reportIssue('${encodeURIComponent(descricao)}', ${lat}, ${lng})">Denunciar</button>
  `);

  // Envia o ponto para o banco via PHP
  try {
    const response = await fetch('../php/salvar_ponto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao: descricao,
        latitude: lat,
        longitude: lng
      })
    });

    const result = await response.json();
    if (result.status === "ok") {
      console.log("Ponto salvo no banco!");
    } else {
      console.error("Erro ao salvar:", result.mensagem);
    }
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error);
  }
});

// =============================
// Função global: remover ponto
// =============================
window.removeMarker = async function (index, id = null) {
  const confirmDelete = confirm("Tem certeza que deseja excluir o ponto?");
  if (confirmDelete && markers[index]) {
    map.removeLayer(markers[index]);
    markers[index] = null;

    // Remove do banco (se tiver ID)
    if (id) {
      try {
        await fetch('php/remover_ponto.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      } catch (error) {
        console.error("Erro ao excluir do banco:", error);
      }
    }
  }
};

// =============================
// Função global: redirecionar à página de denúncia
// =============================
window.reportIssue = function (descricao, lat, lng) {
  const url = `index3.html?descricao=${descricao}&lat=${lat}&lng=${lng}`;
  window.location.href = url;
};

// =============================
// Inicialização
// =============================
carregarPontos();
