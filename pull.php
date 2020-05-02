<?php
if ( $_POST['payload'] ) {
    shell_exec( "cd /var/www/ajinkya.space/ && sudo git reset –hard HEAD && sudo git pull" );
} else {
    header("Location: index.php");
}
?>