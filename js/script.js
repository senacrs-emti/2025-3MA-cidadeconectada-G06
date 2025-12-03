
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


fetch('../php/listar_pontos.php', {
    credentials: 'include'
})
    .then(response => response.json())
    .then(data => {
        data.forEach(ponto => {
            const lat = parseFloat(ponto.latitude);
            const lng = parseFloat(ponto.longitude);
            const descricao = decodeURIComponent(ponto.descricao);
            const id = ponto.id;

            const marker = L.marker([lat, lng]).addTo(map);
            markers.push({ marker, id });

            marker.bindPopup(`
                <b>Problema informado:</b><br>
                ${descricao}<br><br>
                <b>Coordenadas:</b><br>
                ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><br>
                <button onclick="removeMarker(${id})">Remover ponto</button>
                <button onclick="reportIssue('${encodeURIComponent(descricao)}', ${lat}, ${lng})">Denunciar</button>
            `);
        });
    })
    .catch(error => console.error('Erro ao carregar pontos:', error));




map.on('click', function (e) {
    if (!addingMarkers) return; 

    const { lat, lng } = e.latlng;
    const descricao = prompt("Descreva o problema de acessibilidade neste local:");

    if (!descricao) return;

    
    fetch('../php/salvar_ponto.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `descricao=${encodeURIComponent(descricao)}&lat=${lat}&lng=${lng}`,
    credentials: 'include'
})

    .then(response => response.json()) // <-- precisa disso
    .then(data => {
        if (data.status === 'sucesso') {
            const id = data.id;  
    
            const marker = L.marker([lat, lng]).addTo(map);
            markers.push({ marker, id });
    
            marker.bindPopup(`
                <b>Problema informado:</b><br>
                ${descricao}<br><br>
                <b>Coordenadas:</b><br>
                ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><br>
                <button onclick="removeMarker(${id})">Remover ponto</button>
                <button onclick="reportIssue('${encodeURIComponent(descricao)}', ${lat}, ${lng})">Denunciar</button>
            `);
            alert('Ponto salvo com sucesso!');
        } else {
            alert('Erro ao salvar ponto no banco de dados.');
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
    const url = `index3.php?descricao=${descricao}&lat=${lat}&lng=${lng}`;
    window.location.href = url;
};

window.removeMarker = function (id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir o ponto?");
    if (!confirmDelete) return;

    
    fetch('../php/remover_ponto.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${id}`,
    credentials: 'include'
})

    .then(response => response.json())
    .then(data => {
        if (data.status === 'sucesso') {
           
            const markerData = markers.find(m => m.id === id);
            if (markerData) {
                map.removeLayer(markerData.marker);
                markers = markers.filter(m => m.id !== id);
            }
            alert('Ponto removido com sucesso!');
        } else {
            alert('Erro ao remover ponto do banco.');
            console.error(data.mensagem);
        }
    })
    .catch(error => {
        alert('Erro de conexão com o servidor.');
        console.error(error);
    });
};

const btn = document.getElementById('toggleAddButton');

// Impede que o Leaflet capture cliques no botão
L.DomEvent.disableClickPropagation(toggleAddButton);




