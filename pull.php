<?php
$request_method = $_SERVER['REQUEST_METHOD'];
switch ($request_method) {
case 'POST':
	if($_POST['payload']) {
	header('Content-Type: application/json');
	$logfile = fopen("log.json", "w") or die("Unable to open file!");
	$json = $_POST['payload'];
	$response = shell_exec( "cd /var/www/ajinkya.space/ && sudo git reset –hard HEAD && sudo git pull" );
	fwrite($logfile, $json);
	fclose($logfile);
	header('HTTP/1.0 200 OK', true, 200);
	}
	else {
		header('HTTP/1.0 403 Forbidden', true, 403);
		die();
	}
        break;
    default:
	header('HTTP/1.0 403 Forbidden', true, 403);
	die();
        break;
}
?>

