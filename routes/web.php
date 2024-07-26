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

    $body = json_encode([]);

    $route = "https://cscs.chambertrust.ir:8443/services/rest/cardServiceV3/getCardInfoModelByCardNoByCardTypeV3/10320281775/2";
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $route,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => array(
            'Content-Type:application/json',
            'userName:iccima-next',
            'password:txIXYr25VYPk',
        )
    ));
    $response = curl_exec($curl);
    $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    curl_close($curl);
    $response_object = json_decode(preg_replace('/\s+/', ' ', $response));
    $response_object = (array)$response_object;
    dd($response_object, $status_code, $error);
});


require __DIR__ . "/webservice.php";
