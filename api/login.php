<?php
// skip cors errors
include 'cors.php';
include "connectionWeb.php";
//include "steamBoatCon.php";

$mysqli  = connect();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)){

  $pwd = mysqli_real_escape_string($mysqli, trim($request->password));
  $email = mysqli_real_escape_string($mysqli, trim($request->username));
  $sql = "SELECT * FROM users where email='$email' and password='$pwd'";

  if($result = mysqli_query($mysqli,$sql)){
    $rows = array();
    while($row = mysqli_fetch_assoc($result)){
      $rows[] = $row;
    }
    echo json_encode($rows);
    //echo json_encode($postdata);
  }
  else{
    http_response_code(404);
    //echo json_encode($postdata);

  }
}

mysqli_close($connection);
?>