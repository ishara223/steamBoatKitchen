<?php
    function connect(){
        $sever = "68.178.217.15";
        $username = "steamboatkitch";
        $password  = "STEAM@2020gt";
        $database = "steamboatkitch";
        $conn = new mysqli($sever, $username, $password, $database);
        if($conn->connect_error){
            die("Connection Failed" . $conn->connect_error);
        }
        return $conn;
    }