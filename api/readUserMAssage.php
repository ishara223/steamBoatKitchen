<?php
// skip cors errors
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

$connection  = connect();
$userMassage = [];
$sql = "SELECT  * FROM `contactus` ORDER BY `cuId` DESC";

if($result = mysqli_query($connection,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $userMassage[$i]['cuId']    = $row['cuId'];
    $userMassage[$i]['name'] = $row['name'];
    $userMassage[$i]['eMail'] = $row['eMail'];
    $userMassage[$i]['contactNumber']    = $row['contactNumber'];
    $userMassage[$i]['massage']    = $row['massage'];
    $i++;
  }
   
  echo json_encode($userMassage);
}
else
{
  //http_response_code(404);
  echo json_encode($connection);
}

mysqli_close($connection);
?>