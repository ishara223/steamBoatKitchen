<?php
//require 'database.php';
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

//$postdata = json_decode(file_get_contents("php://input"));

// $image[] = $postdata->img;
// $target_dir = "api/";
// $target_file = $target_dir . basename($_FILES[$image]["name"]);
// $uploadOk = 1;
// $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// {
//   $request = json_decode($postdata);


//   if(trim($request-number) === ''  (float)$request-amount  0)
//   {
//     return http_response_code(400);
//   }

//    Sanitize.
//   $number = mysqli_real_escape_string($con, trim($request-number));
//   $amount = mysqli_real_escape_string($con, (int)$request-amount);


//    Create.
//   $sql = INSERT INTO `policies`(`id`,`number`,`amount`) VALUES (null,'{$number}','{$amount}');

//   if(mysqli_query($con,$sql))
//   {
//     http_response_code(201);
//     $policy = [
//       'number' = $number,
//       'amount' = $amount,
//       'id'    = mysqli_insert_id($con)
//     ];
//     echo json_encode($policy);
//   }
//   else
//   {
//     http_response_code(422);
//   }
// }
// echo json_encode($imageFileType);
$response = array();
$upload_dir = 'img/';
$server_url = 'http://localhost:8081/api';
$carouslTitle = $_POST['carouslTitle'] ;
$carouslDiscription = $_POST['carouslDiscription'] ;



if($_FILES['avatar'])
{
    $avatar_name = $_FILES["avatar"]["name"];
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    $error = $_FILES["avatar"]["error"];

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
            $sql = "INSERT INTO `carousl`(`cName`,`cDiscription`,`CImg`,`status`) VALUES ('$carouslTitle','$carouslDiscription','$upload_name','1')"; 
            $connection  = connect();
            $result = mysqli_query($connection,$sql);
            if($result){
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "carousl created successfully",
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
