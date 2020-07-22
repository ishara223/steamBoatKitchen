<?php
// skip cors errors
include 'cors.php';
//include "steamBoatCon.php";
include "connectionWeb.php";

class PostData{}
$postdata = new PostData;
$postdata = json_decode(file_get_contents("php://input"));
$connection  = connect();
$name=$postdata->name;

// if(!empty($postdata->name) &&
//   !empty($postdata->eMail) &&
//   !empty($postdata->contactNumber) &&
//   !empty($postdata->orderType) ){
  // name            : new FormControl(''),
  // eMail           : new FormControl(''),
  // contactNumber   : new FormControl(''),
  // massage         : new FormControl(''),
  // orderType 
  // set product property values
$name = $postdata->name;
$eMail = $postdata->eMail;
$contactNumber = $postdata->contactNumber;
$massage = $postdata->massage;
$orderType = $postdata->orderType;
//}
$sql = "INSERT INTO `contactus` (`name`,`eMail`,`contactNumber`,`orderType`,`massage`)
VALUES ('{$name}','{$eMail}','{$contactNumber}','{$orderType}','{$massage}')";

if (mysqli_query($connection, $sql)) {
  echo json_encode("New order created successfully");
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}
mysqli_close($connection);
//echo json_encode($contactUsForm);
//echo ('$contactUsForm');
?>