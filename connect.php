<?php
$servername = "localhost"; // or your server IP
$username = "root"; // your MySQL username
$password = ""; // your MySQL password
$dbname = "bite_restaurant"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $reservation_date = $_POST['reservation_date'];
    $reservation_time = $_POST['reservation_time'];
    $number_of_people = $_POST['number_of_people'];
    $message = $_POST['message'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO reservations (name, phone, reservation_date, reservation_time, number_of_people, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $phone, $reservation_date, $reservation_time, $number_of_people, $message);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New reservation created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>