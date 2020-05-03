<?php
$request_method = $_SERVER['REQUEST_METHOD'];
switch ($request_method) {
    case 'POST':
        doPost();
        break;
    case 'GET':
        header('Content-Type: application/json');
        echo json_encode($_GET);
        break;
    default:
        # code...
        break;
}

function doPost()
{
    $log = fopen("log.json", "a") or die("Unable to open file!");
    $json = json_encode($_POST);
    fwrite($log, $json);
    fclose($log);
    return response($_POST);
}

function response($x)
{
    header('Content-Type: application/json');
    echo json_encode($x);
}
// if ($_POST) {
//     echo shell_exec("cd /var/www/ajinkya.space/ && sudo git reset –hard HEAD && sudo git pull");
//     $log = fopen("log.json", "a") or die("Unable to open file!");
//     $json = json_encode($_POST);
//     fwrite($log, $json);
//     fclose($log);
// } else {
//     header("Location: index.php");
// }
?>

