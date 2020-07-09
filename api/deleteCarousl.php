<?php
// skip cors errors
include 'cors.php';
include "connectionWeb.php";
//include "steamBoatCon.php";

$connection  = connect();
// Extract, validate and sanitize the id.
//$carousltId = ($_GET['carouslId'] !== null && (int)$_GET['carouslId'] > 0)? mysqli_real_escape_string($connection, (int)$_GET['carouslId']) : false;
$carousltId = json_decode(file_get_contents("php://input"));

if(!$carousltId)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `carousl` WHERE `cId` ='{$carousltId}' LIMIT 1";
$response = mysqli_query($connection, $sql);

if($response)
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
//echo json_encode ($response)

?>