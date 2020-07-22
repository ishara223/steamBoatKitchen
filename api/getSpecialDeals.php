<?php
// skip cors errors
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$connection  = connect();
$specialDeals = [];
$sql = "SELECT  * FROM `special deals` Where `status`=1";

if($result = mysqli_query($connection,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $specialDeals[$i]['sdId']           = $row['sdId'];
    $specialDeals[$i]['pID']            = $row['pID'];
    $specialDeals[$i]['sdName']         = $row['sdName'];
    $specialDeals[$i]['sdDescription']  = $row['sdDescription'];
    $specialDeals[$i]['sdImg']          = $row['sdImg'];
    $specialDeals[$i]['status']         = $row['status'];
    $i++;
  }   
  echo json_encode($specialDeals);
}
else
{
  //http_response_code(404);
  echo json_encode($specialDeals);
}

mysqli_close($connection);
?>