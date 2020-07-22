<?php
//require 'database.php';
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$response           = array();
// $upload_dir         = 'img/product/';
// $server_url         = 'http://localhost:8081/api';
// $productName        = $_POST['productName'] ;
// $productDiscription = $_POST['productDiscription'] ;
// $productMenu        = $_POST['productMenu'] ;
// $productPrice       = $_POST['productPrice'] ;


// if($_FILES['avatar'])
// {
//     $avatar_name        = $_FILES["avatar"]["name"];
//     $avatar_tmp_name    = $_FILES["avatar"]["tmp_name"];
//     $error              = $_FILES["avatar"]["error"];

//     if($error > 0){
//         $response = array(
//             "status" => "error",
//             "error" => true,
//             "message" => "Error uploading the file!"
//         );
//     }else 
//     {
//         $random_name = rand(1000,1000000)."-".$avatar_name;
//         $upload_name = $upload_dir.strtolower($random_name);
//         $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
//         if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            
//             //$sql = "INSERT INTO `carousl`(`cName`,`	cDiscription`,`CImg`,`status`) VALUES ($carouslTitle,$carouslDiscription,$random_name,1)"; 
//             $sql = "INSERT INTO `product`(`mId`,`pName`,`discription`,`price`,`pImg`,`pStatus`) 
//                     VALUES ('$productMenu','$productName','$productDiscription','$productPrice','$upload_name','1')"; 
//             $connection  = connect();
//             $result = mysqli_query($connection,$sql);
//             if($result){
//                 $response = array(
//                     "status" => "success",
//                     "error" => false,
//                     "message" => "Product Add Successfully",
//                     //"url" => $server_url."/".$upload_name
//                 );
//             }         
//         }else
//         {
//             $response = array(
//                 "status" => "error",
//                 "error" => true,
//                 "message" => "Error uploading the file!"
//             );
//         }
//     }
// }else{
//     $response = array(
//         "status" => "error",
//         "error" => true,
//         "message" => "No file was sent!"
//     );
// }
require_once('vendor/autoload.php');
$postdata = json_decode(file_get_contents("php://input"));

$paymentType = $postdata->paymentType;


if($paymentType == "Card payment"){
  $stripe = new \Stripe\StripeClient(
  //'sk_test_klfUjXVNOKEWpuo3O4dbQbNW002TLtL1vy'
  'sk_test_51GzKsMLQE6y0pUWQYpGltPrjGHV3vDgLH1bFKOQ7dFuU8c70R0VE5H4qClexmqkeZ7wnD0Icu6AVPaoeFejtVmyr00idrwkByp'
  );

  $customerDetailsAry = array(
    'name'    =>$postdata->customerName,
    'email'   => $postdata->customerEmail,
    'source'  => $postdata->token,
    'address' => array(
      'line1'   => $postdata->customerAdressLineOne,
      'line1'   => $postdata->customerAdressLineTwo,
      'city'    => $postdata->customerAdressCity,
      'country' =>'CA'
    ), 
  );

  $customerResult = $stripe->customers->create($customerDetailsAry);

  try{
    $charge = $stripe->charges->create([
      'amount'      => $postdata->price*100,
      'currency'    => 'usd',
      //'source' => $postdata->token,
      'customer'    => $customerResult,
      'description' => $postdata->customerPhone,
    ]);
    //$pId = $postdata->cart[0]->product->pId;
    $chId = $charge->id;
    insertOrderDataToDatabase($postdata,$chId);
    $response = array(
        "status" => "success",
        "error" => false,
        "message" => "Order Add Successfully",
        //"url" => $server_url."/".$upload_name
    );
  }catch(\Stripe\Error\Base $e){
    $response = array(
      "status" => "error",
      "error" => true,
      "message" => $e->getMessage()+"Try Agian"
    );
  }catch (Exception $e) {
    // Catch any other non-Stripe exceptions
    $response = array(
      "status" => "error",
      "error" => true,
      "message" => $e->getMessage()+"Try Agian"
    );
  }
}



else if($paymentType == "Pay at store") {
  $chId = null;
  insertOrderDataToDatabase($postdata,$chId);
  $response = array(
    "status" => "success",
    "error" => false,
    "message" => "Order Add Successfully",
    //"url" => $server_url."/".$upload_name
  );
} 

  
  /*$cusromerName= $postdata->customerName;
  $email= $postdata->customerEmail;
  $date= $postdata->date;
  $time= $postdata->time;
  $price= $postdata->price;
  $phone= $postdata->customerPhone;
  $customerAdressCity= $postdata->customerAdressCity;
  $customerAdressLineOne= $postdata->customerAdressLineOne;
  $customerAdressLineTwo= $postdata->customerAdressLineTwo;
  $foodReciveType= $postdata->foodReciveType;
  $paymentType= $postdata->paymentType;*/
function insertOrderDataToDatabase($postdata,$chId){

  $cusromerName= $postdata->customerName;
  $email= $postdata->customerEmail;
  $date= $postdata->date;
  $time= $postdata->time;
  $price= $postdata->price;
  $phone= $postdata->customerPhone;
  $customerAdressCity= $postdata->customerAdressCity;
  $customerAdressLineOne= $postdata->customerAdressLineOne;
  $customerAdressLineTwo= $postdata->customerAdressLineTwo;
  $foodReciveType= $postdata->foodReciveType;
  $paymentType= $postdata->paymentType;
  $chId = $chId;

  $sql = "INSERT INTO `foodorder`(`chId`,`cusromerName`,`email`,`phone`,`adressLineOne`,`aderessLineTwo`,`city`,`paymentType`,`foodReciveType`,`date`,`time`,`price`,`status`) 
  VALUES ('$chId','$cusromerName','$email','$phone','$customerAdressLineOne','$customerAdressLineTwo','$customerAdressCity','$paymentType','$foodReciveType','$date','$time','$price','Recived')"; 
  $connection  = connect();
  $result = mysqli_query($connection,$sql);
  $orId = $connection->insert_id;

  $encodedOdData = json_encode($postdata->cart);
  $data = json_decode($encodedOdData, true);

  $st = mysqli_prepare($connection, 'INSERT INTO `orderproduct`(`quenatity`,`orId`,`pId`) VALUES (?,?,?)');

  mysqli_stmt_bind_param($st,'iii',$quentity,$oId,$pId);

  foreach ($data as $row) {
    $quentity = $row['quentity'];
    $oId = $orId;
    $pId = $row['pId'];
    $true = mysqli_stmt_execute($st);
  }
}
mysqli_close($connection); 
echo json_encode($response);
    //echo json_encode($customerResult);