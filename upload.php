<?php
include("config.php");

// Create connection
$conn = mysqli_connect($dbservername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$stmt = $conn->prepare('Insert into code(code) values (?);');


$stmt->bind_param('s',$_POST['code']);

$stmt->execute();
$id = mysqli_insert_id($conn);

$stmt->close();
$conn->close();

echo $id;
?>
