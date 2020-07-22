<?php
// skip cors errors
include 'cors.php';
//include "connection.php";
include "connectionWeb.php";

$connection  = connect();
$items = [];
$sql = "SELECT  * FROM `items`";

if($result = mysqli_query($connection,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $items[$i]['id']    = $row['id'];
    $items[$i]['name'] = $row['name'];
    $items[$i]['size'] = $row['size'];
    $items[$i]['price']    = $row['price'];
    $items[$i]['discription'] = $row['discription'];
    $items[$i]['img'] = $row['img'];
    $i++;
  }

  echo json_encode($items);
}
else
{
  http_response_code(404);
}

mysqli_close($connection);
?>