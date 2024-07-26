<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomePageController;
use App\Helpers\Pdate;
use Elastic\Elasticsearch\ClientBuilder;
use App\Models\CardsDataOracle;

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
    // $route = "https://cscs.chambertrust.ir:8443/services/rest/cardServiceV3/getCardInfoModelByCardNoByCardTypeV3/10320281775/2";
    // $headers = [
    //     "Content-Type" => "application/json",
    //     "userName" => "iccima-next",
    //     "password" => "txIXYr25VYPk",
    // ];
    // $r = @iccima_request_http([], $route, "GET", $headers)['response_object'];
    // $r__keys = array_keys($r);

    // $migrate_note = "";
    // foreach ($r__keys as $rk) {
    //     $migrate_note.='$table->string("'.$rk.'")->nullable();'." \n";
    // }
    // dd(
    //     json_encode($r__keys),
    //     $migrate_note,
    // );
});


require __DIR__ . "/webservice.php";
