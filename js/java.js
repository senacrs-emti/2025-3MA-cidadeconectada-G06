// Cria o mapa centralizado em Porto Alegre
const map = L.map('map').setView([-30.0346, -51.2177], 13);

// Adiciona o mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Variável de controle do modo de marcação
let addingMarkers = false;

// Referência do botão
const toggleAddButton = document.getElementById('toggleAddButton');

// Quando o botão é clicado, ativa ou desativa o modo de marcação
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

// Armazena os marcadores
let markers = [];

// Função para adicionar marcador no clique
map.on('click', function (e) {
    if (!addingMarkers) return; // só marca se o modo estiver ativo

    const { lat, lng } = e.latlng;

    // Pede que o usuário digite o problema
    const descricao = prompt("Descreva o problema de acessibilidade neste local:");

    if (!descricao) return; // se cancelar ou deixar vazio, não adiciona

    const marker = L.marker([lat, lng]).addTo(map);
    markers.push(marker);

    marker.bindPopup(`
        <b>Problema informado:</b><br>
        ${descricao}<br><br>
        <b>Coordenadas:</b><br>
        ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><br>
        <button onclick="removeMarker(${markers.length - 1})">Remover ponto</button>
    `);
});

// Função global para remover um ponto específico
window.removeMarker = function (index) {
    const confirmDelete = confirm("Tem certeza que deseja excluir o ponto?");
    if (confirmDelete && markers[index]) {
        map.removeLayer(markers[index]);
        markers[index] = null; // remove da lista
    }
};
