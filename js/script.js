
const map = L.map('map').setView([-30.0346, -51.2177], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


let addingMarkers = false;


const toggleAddButton = document.getElementById('toggleAddButton');

if (toggleAddButton) {
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
}


let markers = [];


fetch('../php/listar_pontos.php')
    .then(response => {
        if (!response.ok) throw new Error('Erro HTTP: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Pontos carregados:', data);
        data.forEach((ponto, index) => {
            const lat = parseFloat(ponto.latitude);
            const lng = parseFloat(ponto.longitude);
            const descricao = decodeURIComponent(ponto.descricao);

            if (isNaN(lat) || isNaN(lng)) return;

            const marker = L.marker([lat, lng]).addTo(map);
            markers.push(marker);

            marker.bindPopup(`
                <b>Problema informado:</b><br>
                ${descricao}<br><br>
                <b>Coordenadas:</b><br>
                ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><br>
                <button onclick="removeMarker(${index})">Remover ponto</button>
                <button onclick="reportIssue('${encodeURIComponent(descricao)}', ${lat}, ${lng})">Denunciar</button>
            `);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar pontos:', error);
        alert('Erro ao carregar pontos: ' + error.message);
    });



map.on('click', function (e) {
    if (!addingMarkers) return; 

    const { lat, lng } = e.latlng;
    const descricao = prompt("Descreva o problema de acessibilidade neste local:");

    if (!descricao) return;

    
    fetch('../php/salvar_ponto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `descricao=${encodeURIComponent(descricao)}&lat=${lat}&lng=${lng}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'sucesso') {
                // Adiciona o marcador visualmente no mapa
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

                alert('Ponto salvo com sucesso!');
            } else {
                alert('Erro ao salvar ponto no banco.');
                console.error(data.mensagem);
            }
        })
        .catch(error => {
            alert('Erro ao conectar com o servidor.');
            console.error(error);
        });
});


window.removeMarker = function (index) {
    const confirmDelete = confirm("Tem certeza que deseja excluir o ponto?");
    if (confirmDelete && markers[index]) {
        map.removeLayer(markers[index]);
        markers[index] = null;
    }
};


window.reportIssue = function (descricao, lat, lng) {
    const url = `index3.html?descricao=${descricao}&lat=${lat}&lng=${lng}`;
    window.location.href = url;
};
