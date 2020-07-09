<?php
function connect(){
    $sever = "localhost";
    $username = "root";
    $password  = "";
    $database = "steamboatdb";
    $conn = new mysqli($sever, $username, $password, $database);
    if($conn->connect_error){
        die("Connection Failed" . $conn->connect_error);
    }
    return $conn;
}