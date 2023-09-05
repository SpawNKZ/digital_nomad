<?php
$con = mysqli_connect('srv-pleskdb15.ps.kz:3306', 'digita76_nomad', 'Nomad2023@@','digita76_nomad');
$txtName = $_POST['txtName'];
$txtEmail = $_POST['txtEmail'];
$txtPhone = $_POST['txtPhone'];
$txtMessage = $_POST['txtMessage'];
$checkboxType= $_POST['checkbox-select'];
$price = $_POST['select'];
$chk="";
foreach($checkboxType as $chk1)
{
    $chk .= $chk1.",";
}
        $sql = "INSERT INTO `tbl_forms` (`id`, `fullName`, `email`, `phone`, `description`, `price`, `type`) VALUES ('0', '$txtName', '$txtEmail', '$txtPhone', '$txtMessage', '$price','$chk');";
        $rs = mysqli_query($con, $sql);

    if ($rs) {
        echo'<script>alert("Inserted Successfully")</script>';
        header("location: index.html");

    }else
    {
        echo'<script>alert("Failed To Insert")</script>';
        header("location: contact.html");

    }


