<?php
include("config.php");

// Create connection
$conn = mysqli_connect($dbservername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$stmt = $conn->prepare('Update code set code = (?) where id=(?);');


$stmt->bind_param('ss',$_POST['code'],$_POST['id']);

$stmt->execute();

$stmt->close();
$conn->close();

?>
