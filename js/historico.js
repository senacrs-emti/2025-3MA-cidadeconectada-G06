// Carrega os pontos do banco de dados
fetch('../php/listar_historico.php')
    .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data); // <-- debug
        const tabela = document.getElementById('tabelaHistorico');
        tabela.innerHTML = ''; // limpa o "Carregando..."

        if (!Array.isArray(data) || data.length === 0) {
            tabela.innerHTML = '<tr><td colspan="5">Nenhum ponto cadastrado.</td></tr>';
            return;
        }

        data.forEach(ponto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${ponto.id}</td>
                <td>${ponto.descricao}</td>
                <td>${ponto.latitude}</td>
                <td>${ponto.longitude}</td>
                <td>
                    <button onclick="abrirMapa(${ponto.latitude}, ${ponto.longitude})">Ver no mapa</button>
                    <button onclick="removerPonto(${ponto.id}, this)">Excluir</button>
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

// Abre o ponto no mapa
function abrirMapa(lat, lng) {
    window.location.href = `../html/index2.html?lat=${lat}&lng=${lng}`;
}

// Remove o ponto do banco e da tabela
function removerPonto(id, botao) {
    if (!confirm('Tem certeza que deseja excluir este ponto?')) return;

    fetch('../php/remover_ponto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'sucesso') {
                botao.closest('tr').remove();
                alert('Ponto removido com sucesso!');
            } else {
                alert('Erro ao remover ponto.');
                console.error(data.mensagem);
            }
        })
        .catch(error => {
            alert('Erro ao conectar com o servidor.');
            console.error(error);
        });
}
