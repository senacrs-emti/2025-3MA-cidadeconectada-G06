
fetch('../php/listar_historico.php')
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById('tabelaHistorico');
        tabela.innerHTML = '';

        if (!Array.isArray(data) || data.length === 0) {
            tabela.innerHTML = '<tr><td colspan="5">Nenhum ponto cadastrado.</td></tr>';
            return;
        }

        data.forEach(ponto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${ponto.id}</td>
                <td>${decodeURIComponent(ponto.descricao)}</td>
                <td>${parseFloat(ponto.latitude).toFixed(5)}</td>
                <td>${parseFloat(ponto.longitude).toFixed(5)}</td>
                <td>
                    <button onclick="abrirMapa(${ponto.latitude}, ${ponto.longitude})">Ver no mapa</button>
                    
                </td>
            `;
            tabela.appendChild(linha);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar histórico:', error);
        document.getElementById('tabelaHistorico').innerHTML =
            '<tr><td colspan="5">Erro ao carregar histórico.</td></tr>';
    });


function abrirMapa(lat, lng) {
    window.location.href = `./index.html?lat=${lat}&lng=${lng}`;
}



