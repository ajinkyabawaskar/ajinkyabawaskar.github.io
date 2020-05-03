<?php
if ($_POST) {
    echo shell_exec("cd /var/www/ajinkya.space/ && sudo git reset –hard HEAD && sudo git pull");
    $log = fopen("log.json", "a") or die("Unable to open file!");
    $json = json_encode($_POST);
    fwrite($log, $json);
    fclose($log);
} else {
    header("Location: index.php");
}
