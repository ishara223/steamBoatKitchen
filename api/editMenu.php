<?php
//require 'database.php';
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";
$response           = array();
$upload_dir         = 'img/menu/';
//$server_url         = 'http://localhost:8081/api';
$productName        = $_POST['menuName'] ;
$productDiscription = $_POST['menuDiscription'] ;
//$productMenu        = $_POST['productMenu'] ;
//$productPrice       = $_POST['productPrice'] ;
$mId                = $_POST['mId'] ;

if(isset($_FILES['avatar']))
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

            $sql = "UPDATE `menu` SET `mName` = '$productName',`mDiscription` = '$productDiscription',`pImg` = '$upload_name' WHERE `mId`= '$mId'";
            $connection  = connect();
            $result = mysqli_query($connection,$sql);
            if($result){
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "Menu Add Successfully",
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
    $sql = "UPDATE `menu` SET `mName` = '$productName',`mDiscription` = '$productDiscription' WHERE `mId`= '$mId'";
    $connection  = connect();
    $result = mysqli_query($connection,$sql);
    if($result){
        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Menu Add Successfully",
            //"url" => $server_url."/".$upload_name
        );
    } 

}
mysqli_close($connection);
echo json_encode($response);
//echo json_encode($random_name);
