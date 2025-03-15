<?php
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone_number = $_POST["phone_number"];
  $message = $_POST["message"];
  $property_type = $_POST["property_type"];
  $property_details = $_POST["property_details"];

  $sql = "INSERT INTO property_inquiries (name, email, phone_number, message, property_type, property_details) VALUES ('$name', '$email', '$phone_number', '$message', '$property_type', '$property_details')";

  if ($conn->query($sql) === TRUE) {
    echo "Form submitted successfully!";
  } else {
    echo "Error submitting form: " . $conn->error;
  }
}
?>
