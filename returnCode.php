<?php
include("config.php");

// Create connection
$conn = new mysqli($dbservername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, code FROM code where id='" . $_GET['id'] ."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row['code'];
    }
} 
$conn->close();
?>
