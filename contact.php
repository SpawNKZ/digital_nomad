<?php
$con = mysqli_connect('localhost', 'root', '','db_nomad');
$txtName = $_POST['txtName'];
$txtEmail = $_POST['txtEmail'];
$txtPhone = $_POST['txtPhone'];
$txtMessage = $_POST['txtMessage'];
$checkboxType= $_POST['checkbox-select[]'];
$price = $_POST['price'];


if (isset($_POST['checkbox-select[]'])) {
    for ($i = 0; $i < sizeof($checkboxType); $i++) {
        $sql = "INSERT INTO `tbl_forms` (`id`, `fullName`, `email`, `phone`, `description`, `price`, `type`) VALUES ('0', '$txtName', '$txtEmail', '$txtPhone', '$txtMessage', '$price','" . $checkboxType[$i] . "',);";
        $rs = mysqli_query($con, $sql);
    }
}

    if ($rs) {
        echo "Contact Records Inserted";
    }

