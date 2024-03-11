<?php

// Retrieve data from Query String
   $email = $_GET['email'];
   $name = $_GET['name'];
   $message = $_GET['message'];

$to = "srichetaruj@fmail.com";
$subject = "Hello There!";



// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: '.$email.' . "\r\n";
$headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);
?>