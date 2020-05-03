<?php
$request_method = $_SERVER['REQUEST_METHOD'];
{
    header('Content-Type: application/json');
    echo json_encode($_SERVER['REQUEST_METHOD']);
}
?>

