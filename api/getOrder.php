<?php
    include 'cors.php';
    //include "steamBoatCon.php";
    include "connectionWeb.php";
    //$connection  = connect();

    $orderState = file_get_contents("php://input");
    $connection  = connect();
    $orders = [];
    //$sql = "SELECT * FROM `foodorder` WHERE `status`= $orderState";

    switch ($orderState) {
        case 'Recived':
            $sql = "SELECT * FROM `foodorder` WHERE `status`= 'Recived' ORDER BY `orId` DESC";
          break;
        case 'Done':
            $sql = "SELECT * FROM `foodorder` WHERE `status`= 'Done' ORDER BY `orId` DESC";
          break;
        case 'Cancelled':
            $sql = "SELECT * FROM `foodorder` WHERE `status`= 'Cancel' ORDER BY `orId` DESC";
          break;
        default:
          
      }

    //$sql = "SELECT * FROM `foodorder`";
    //SELECT * FROM `orderproduct` INNER JOIN `product` ON orderproduct.pId = product.pId
    if($result = mysqli_query($connection,$sql)){
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $orders[$i]['orId']            = $row['orId'];
            //$orders[$i]['chId']           = $row['chId'];
            $orders[$i]['cusromerName']           = $row['cusromerName'];
            $orders[$i]['email']          = $row['email'];
            $orders[$i]['phone']    = $row['phone'];
            $orders[$i]['phone']           = $row['phone'];
            $orders[$i]['adressLineOne']          = $row['adressLineOne'];
            $orders[$i]['aderessLineTwo']    = $row['aderessLineTwo'];
            $orders[$i]['city']           = $row['city'];
            $orders[$i]['paymentType']          = $row['paymentType'];
            $orders[$i]['foodReciveType']    = $row['foodReciveType'];
            $orders[$i]['date']           = $row['date'];
            $orders[$i]['time']        = $row['time'];
            $orders[$i]['price']           = $row['price'];
            $orders[$i]['status']        = $row['status'];
            
            $products = [];
            $sqlProduct = "SELECT * FROM `orderproduct` INNER JOIN `product` ON orderproduct.pId = product.pId WHERE orderproduct.orId= $row[orId]";
            if($result2 = mysqli_query($connection,$sqlProduct)){
                $ii = 0;
                while($row = mysqli_fetch_assoc($result2)){
                    $products[$ii]['orderProductID']            = $row['orderProductID'];
                    $products[$ii]['orId']           = $row['orId'];
                    $products[$ii]['pName']          = $row['pName'];
                    $products[$ii]['quenatity']           = $row['quenatity'];
                    $products[$ii]['price']          = $row['price'];
                    /*$products[$i]['phone']    = $row['phone'];
                    $products[$i]['orderType']          = $row['orderType'];
                    $products[$i]['date']           = $row['date'];
                    $products[$i]['time']        = $row['time'];
                    $products[$i]['price']           = $row['price'];
                    $products[$i]['status']        = $row['status'];*/
                    $ii++;
                }
            }
            $orders[$i]['product']        = $products;
            $i++;
        }
    echo json_encode($orders);
    //echo json_encode($row);
    }
    else{
    http_response_code(404);
    //echo json_encode($connection);
    }

  
    //echo json_encode($id);
?>