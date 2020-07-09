<?php
//require 'database.php';
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$response           = array();
$postdata = file_get_contents("php://input");
$orderDetails = json_decode($postdata);
$action = $orderDetails->action;
$orderId = $orderDetails->orderId;

if($action == "Done"){
    $response = insertOrderDataToDatabase($action,$orderId);
}
else if($action == "Cancel"){
    $response = insertOrderDataToDatabase($action,$orderId);
}

function insertOrderDataToDatabase($action,$orderId){ 
    $sql = "UPDATE `foodorder` SET `status` = '$action' WHERE `orId`= '$orderId'";
    $connection  = connect();
    $result = mysqli_query($connection,$sql);
    
    if($result){
        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Successfull",
        );
    }         
    else{
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error"
        );
    } 
    return $response;               
}
echo json_encode($response);
