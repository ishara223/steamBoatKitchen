<?php
// skip cors errors
include 'cors.php';
include "connectionWeb.php";
//include "steamBoatCon.php";

$connection  = connect();
// Extract, validate and sanitize the id.
//$productId = ($_GET['productId'] !== null && (int)$_GET['productId'] > 0)? mysqli_real_escape_string($connection, (int)$_GET['productId']) : false;
$productId = json_decode(file_get_contents("php://input"));

if(!$productId)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `product` WHERE `pId` ='{$productId}' LIMIT 1";
$response = mysqli_query($connection, $sql);

if($response)
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
echo json_encode ($response);
mysqli_close($connection);
?>