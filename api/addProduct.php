<?php
//require 'database.php';
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$response           = array();
$upload_dir         = 'img/product/';
$server_url         = 'http://localhost:8081/api';
$productName        = $_POST['productName'] ;
$productDiscription = $_POST['productDiscription'] ;
$productMenu        = $_POST['productMenu'] ;
$productPrice       = $_POST['productPrice'] ;


if($_FILES['avatar'])
{
    $avatar_name        = $_FILES["avatar"]["name"];
    $avatar_tmp_name    = $_FILES["avatar"]["tmp_name"];
    $error              = $_FILES["avatar"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            
            //$sql = "INSERT INTO `carousl`(`cName`,`	cDiscription`,`CImg`,`status`) VALUES ($carouslTitle,$carouslDiscription,$random_name,1)"; 
            $sql = "INSERT INTO `product`(`mId`,`pName`,`discription`,`price`,`pImg`,`pStatus`) 
                    VALUES ('$productMenu','$productName','$productDiscription','$productPrice','$upload_name','1')"; 
            $connection  = connect();
            $result = mysqli_query($connection,$sql);
            if($result){
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "Product Add Successfully",
                    //"url" => $server_url."/".$upload_name
                );
            }         
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }
}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}
mysqli_close($connection);
echo json_encode($response);
//echo json_encode($random_name);
