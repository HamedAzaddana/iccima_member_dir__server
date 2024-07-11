<?php


use Illuminate\Support\Facades\Route;
Route::get('/test-pdo-oci', function () {
    $host = env("ORACLE_DB_HOST", "");
    $dbname = env("ORACLE_DB_NAME", "");
    $port = env("ORACLE_DB_HOST_PORT", "");
    $service = env("ORACLE_DB_SERVICE_NAME", "");
    $user = env("ORACLE_DB_USERNAME", "");
    $pass = env("ORACLE_DB_PASSWORD", "");
    $tns = env("ORACLE_DB_TNS", "");

    $db_username = $user;
    $db_password = $pass;
    $db = "oci:dbname=$tns";
    $conn = new PDO($db,$db_username,$db_password);
    $stmt = $conn->prepare('SELECT * FROM ICCIM.TEMP_POWER_BI_VIEW');
    $stmt->execute();
    
});
Route::get('/test-oci', function () {
    $start = microtime(true);


    $username = 'BI_User';
    $password = 'RkE5gZUK0fm3hyBZpVdj';
    $connection_string = '172.16.0.58:1521/smartdb';

    $conn = oci_pconnect($username, $password, $connection_string, "AL32UTF8");

    if (!$conn) {
        $error = oci_error();
        echo "Oracle connection error: " . $error['message'];
        exit;
    }

    echo "Connected to Oracle!";

    $stid = oci_parse($conn, 'SELECT * FROM ICCIM.TEMP_POWER_BI_VIEW WHERE ROWNUM <= 1000');
    oci_execute($stid);

    echo "<pre>\n";
    while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
        echo var_dump($row) . "<br>";
    }
    echo "</pre>\n";

    oci_free_statement($stid);
    oci_close($conn);

    $end = microtime(true);
    $elapsed = $end - $start;

    echo "Script executed in $elapsed seconds";
});