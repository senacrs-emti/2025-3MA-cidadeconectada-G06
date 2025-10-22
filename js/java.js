
const map = L.map('map').setView([-30.0346, -51.2177], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let addingMarkers = false;


const toggleAddButton = document.getElementById('toggleAddButton');


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


let markers = [];


map.on('click', function (e) {
    if (!addingMarkers) return; 

    const { lat, lng } = e.latlng;


    const descricao = prompt("Descreva o problema de acessibilidade neste local:");

    if (!descricao) return; 

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


window.removeMarker = function (index) {
    const confirmDelete = confirm("Tem certeza que deseja excluir o ponto?");
    if (confirmDelete && markers[index]) {
        map.removeLayer(markers[index]);
        markers[index] = null; 
    }
};
