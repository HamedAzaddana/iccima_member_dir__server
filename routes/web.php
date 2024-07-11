<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomePageController;
use App\Helpers\Pdate;
use Elastic\Elasticsearch\ClientBuilder;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomePageController::class, 'index'])->name('home.index');
Route::get('/test', function () {
    // phpinfo();
    // dd(config('database.connections.elasticsearch.hosts'));

    // $client = ClientBuilder::create()
    //     ->setHosts([env("ELASTICSEARCH_URL")])
    //     ->setApiKey(env("ELASTICSEARCH_API_KEY"))
    //     ->build();

    echo var_dump(function_exists('oci_connect'));
    // echo var_dump(ini_get('extension_dir'));

    // dd(getenv("ORACLE_HOME"),getenv("LD_LIBRARY_PATH")); // /opt/oracle/instantclient_23_4
    // /home/iccima/oracle_db/instantclient_23_4
    // echo var_dump(getenv("LD_LIBRARY_PATH"));

    // $username = 'your_username';
    // $password = 'your_password';
    // $connection_string = 'localhost/XE';

    // $conn = oci_connect($username, $password, $connection_string);

    // if (!$conn) {
    //     $error = oci_error();
    //     echo "Oracle connection error: " . $error['message'];
    //     exit;
    // }

    // echo "Connected to Oracle!";
});


require __DIR__ . "/webservice.php";
