<?php
// skip cors errors
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$connection  = connect();
$menu = [];
$sql = "SELECT  * FROM `menu`";

if($result = mysqli_query($connection,$sql)){

  $i = 0;

  while($row = mysqli_fetch_assoc($result)){

    $menu[$i]['mId']    = $row['mId'];
    $menu[$i]['mName'] = $row['mName'];
    $menu[$i]['mDiscription']  = $row['mDiscription'];
    $menu[$i]['mImg']          = $row['mImg'];
    $menu[$i]['status']        = $row['status'];
    $i++;
  }
  echo json_encode($menu);
}  
else{
  //http_response_code(404);
  echo json_encode($connection);
}

mysqli_close($connection);
?>