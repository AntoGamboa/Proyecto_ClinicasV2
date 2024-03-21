<?php
    header('Access-Control-Allow-Origin: *');
    session_start();
    if(!isset($_SESSION['usuario']))
    {
        echo json_encode([
            'Success' => false,
            'Message' => 'no hay una Session Iniciada'
        ]);
    }else
    {
        echo json_encode([
            'Success' => true,
            'NombreCompleto' => $_SESSION['NombreCompleto'],
            'usuario' =>  $_SESSION['usuario']
        ]);
    }

?>