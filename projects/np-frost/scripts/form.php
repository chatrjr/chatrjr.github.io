<?php

if (!$_POST) {
    die("This file cannot be accessed directly.");
}

$nameCheck =    '/^[A-z\s-]+$/';
$emailCheck =   '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/';

function validateLength($fieldValue, $minLength) {
    return (strlen(trim($fieldValue)) > $minLength);
}

$name               = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email              = filter_var($_POST['email'], FILTER_SANITIZE_STRING, FILTER_VALIDATE_EMAIL);
$message            = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$trap               = filter_var($_POST['trap'], FILTER_SANITIZE_STRING);

if ($trap !== '') {
    die("Mail sent successfully. Thanks");
}

$errorExists        = false;
$errors             = "Errors: <ul>";

// Mail config

$to = 'theguy@notebookandpenguin.com';
$subject = "$name wants to talk.";
$body = $message;
$headers = 'From: mail@notebookandpenguin.com' . "\r\n";
$headers .= "Reply-To: $name <$email>" . "\r\n";

// Name

if (!validateLength($name, 2)) {
    $errorExists = true;
    $errors .= "<li>The name is too short!</li>";
}

if (preg_match($nameCheck, $name) !== 1) {
    $errorExists = true;
    $errors .= "<li>Your name is strange to have numbers or symbols.</li>";
}

if (preg_match($emailCheck, $email) !== 1) {
    $errorExists = true;
    $errors .= "<li>Your email isn't valid.";
}

if (!validateLength($message, 2)) {
    $errorExists = true;
    $errors .= "<li>I know you have more to say than that.</li>";
}

if (!$errorExists) {
    echo "Awesome! I'll get back to you soon.";
    mail($to, $subject, $body, $headers);
} else {
    echo "<h3>We're not done here yet:</h3>"
        . $errors;
}
