<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IncluiPOA</title>

    <link rel="shortcut icon" type="imagex/png" href="../img/logo-incluiPoa.png">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/header.css">

</head>

<body>
    
     <?php
session_start();

?>



    <header class="max">
        <div class="container">
            <div class="Logo">
                <img src="../img/logo-incluiPoa.png" alt="Logo IncluiPOA">
            </div>

            <nav>
    <ul>
        <li><a href="index2.php">Histórico</a></li>
        <li><a href="index1.php">Menu</a></li>
        <li><a href="../html/Info/aboutus.html">Sobre nós</a></li>


        <?php if (isset($_SESSION['id'])): ?>
            <li><span style="color: white; font-weight: bold;">
                Olá, <?= htmlspecialchars($_SESSION['username'] ?? 'Usuário'); ?>
            </span></li>
            <li><a href="../php/logout.php">Sair</a></li>

        <?php else: ?>
            <li><a href="index4.php">Registrar</a></li>
            <li><a href="index5.php">Login</a></li>
        <?php endif; ?>
    </ul>
</nav>

        </div>
    </header>

    <div class="title">
        
    </div>

    
    

    <div id="map">
        <button id="toggleAddButton">Ativar modo de marcação</button>
    </div>


    

   
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="../js/script.js"></script>
</body>
</html>
