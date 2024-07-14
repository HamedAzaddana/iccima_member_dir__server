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

Route::get('/test2', function () {
   
});
Route::get('/test', function () {
    $start = microtime(true);
    $data = App\Models\CardsDataOracle::get()->toArray();
    $end = microtime(true);
    $elapsed = $end - $start;
    // dd($data,$elapsed);
    echo "Script executed in $elapsed seconds <br>";
    echo "Number of records : " .count($data)."<br>";
    // 35 sec for 337625 records
});


require __DIR__ . "/webservice.php";
