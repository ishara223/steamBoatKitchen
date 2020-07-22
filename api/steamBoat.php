<?php
// skip cors errors
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$connection  = connect();
$carousl = [];
$sql = "SELECT  * FROM `carousl`";

if($result = mysqli_query($connection,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $carousl[$i]['cId']    = $row['cId'];
    $carousl[$i]['cName'] = $row['cName'];
    $carousl[$i]['cDiscription'] = $row['cDiscription'];
    $carousl[$i]['CImg']    = $row['CImg'];
    $i++;
  }
   
  echo json_encode($carousl);
}
else
{
  //http_response_code(404);
  echo json_encode($connection);
}

mysqli_close($connection);
?>