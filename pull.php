<?php
if ( $_POST['payload'] ) {
    shell_exec( ‘cd /var/www/ajinkya.space/ && git reset –hard HEAD && git pull’ );
}
?>hi