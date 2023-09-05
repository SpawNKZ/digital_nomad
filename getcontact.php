<?php
$fullName =mysqli::real_escape_string($_POST['your-name']);
$email = mysqli::real_escape_string($_POST['your-email']);
$message = mysqli::real_escape_string($_POST['checkbox-select-end']);
$price = mysqli::real_escape_string($_POST['text-tell-project']);
$phone = $_POST['phone'];

// Database connection
$conn = new mysqli('localhost','root','','company_db');
if($conn->connect_error){
    echo "$conn->connect_error";
    die("Connection Failed : ". $conn->connect_error);
} else {
    $stmt = $conn->prepare("insert into input_table(fullName, message,price,phone, email) values(?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fullName,$message,  $price, $phone,$email);
    $execval = $stmt->execute();
    $stmt->close();
    $conn->close();
}

