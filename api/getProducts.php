<?php
    include 'cors.php';
    //include "steamBoatCon.php";
    include "connectionWeb.php";
    $connection  = connect();

    // Get the posted data.
   /* $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
    // Extract the data.
    $id = json_decode($postdata);
    }*/
    $id = file_get_contents("php://input");
    $connection  = connect();
    $products = [];
    $sql = "SELECT * FROM `product` WHERE `mId`= $id  && `pStatus`=1";

    if($result = mysqli_query($connection,$sql)){

    $i = 0;

    while($row = mysqli_fetch_assoc($result)){
        $products[$i]['mId']            = $row['mId'];
        $products[$i]['pId']           = $row['pId'];
        //$products[$i]['pId ']           = $row['pId'];
        $products[$i]['pName']          = $row['pName'];
        $products[$i]['discription']    = $row['discription'];
        $products[$i]['price']          = $row['price'];
        $products[$i]['pImg']           = $row['pImg'];
        $products[$i]['pStatus']        = $row['pStatus'];
        $i++;
    }
    echo json_encode($products);
    //echo json_encode($row);
    }
    else{
    //http_response_code(404);
    echo json_encode($connection);
    }

  
    //echo json_encode($postdata);
?>