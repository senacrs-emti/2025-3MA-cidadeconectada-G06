<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IncluiPOA - Histórico</title>
    <link rel="stylesheet" href="../css/style2.css">
    <link rel="shortcut icon" type="imagex/png" href="../img/logo-incluiPoa.png">
</head>

<body id="history-body">
    <div id="history-container">
        <h1>Seu histórico de marcações</h1>
        
        <button id="backButton" onclick="window.location.href='../html/index1.php'">
            Voltar ao menu
        </button>

        <div id="table-wrapper">
            <table id="tabelaPontos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaHistorico">
                    <tr><td colspan="5">Carregando...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <script src="../js/historico.js"></script>
</body>
</html>
