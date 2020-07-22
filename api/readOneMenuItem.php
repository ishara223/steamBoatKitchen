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
    $id = json_decode(file_get_contents("php://input"));
    $connection  = connect();
    $products = [];
    $sql = "SELECT * FROM `menu` WHERE `mId`= $id  && `status`=1";

    if($result = mysqli_query($connection,$sql)){

    $i = 0;

    while($row = mysqli_fetch_assoc($result)){

        $products[$i]['mId']           = $row['mId'];
        $products[$i]['mName']         = $row['mName'];
        $products[$i]['mDiscription']  = $row['mDiscription'];
        $products[$i]['mImg']          = $row['mImg'];
        $products[$i]['status']        = $row['status'];
        $i++;
    }
    echo json_encode($products);
    }
    else{
    //http_response_code(404);
    echo json_encode($connection);
    }

    mysqli_close($connection);
    //echo json_encode($postdata);
?>