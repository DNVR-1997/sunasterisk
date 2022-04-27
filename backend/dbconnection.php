<?php

function openDBconnection()
{
    $server = "mysql:host=localhost; dbname=article";
    $username = "root";
    $pass = "";
    $option = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
    try {
        $con = new PDO($server, $username, $pass, $option);
        return $con;
    } catch (PDOException $ex) {
        echo "Failed Database Connection :" . $ex->getMessage();
    }
}
