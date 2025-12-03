<?php
session_start();
echo "ID DA SESSÃO: " . session_id() . "<br>";
echo "USER ID: " . ($_SESSION['id'] ?? 'NÃO EXISTE') . "<br>";
