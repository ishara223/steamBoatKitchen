<?php
// skip cors errors
include 'cors.php';
include "connectionWeb.php";
//include "steamBoatCon.php";

$menuId = json_decode(file_get_contents("php://input"));
$connection  = connect();
// Extract, validate and sanitize the id.
//$menuId = ($_GET['menuId'] !== null && (int)$_GET['menuId'] > 0)? mysqli_real_escape_string($connection, (int)$_GET['menuId']) : false;

if(!$menuId)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `menu` WHERE `mId` ='{$menuId}' LIMIT 1";

if(mysqli_query($connection, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
echo json_encode($postdata);
mysqli_close($connection);
?>