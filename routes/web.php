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
    $route = "https://cscs.chambertrust.ir:8443/services/rest/cardService/fullMemberDirectoryInfo/612001";
    $headers = [
        "Content-Type" => "application/json",
        "userName" => "MemberDirectoryReader",
        "password" => "yA'wk`5sL=Y189kG|2|;",
    ];
    $r = @iccima_request_http([], $route, "GET", $headers)['response_object'];


    dd($r);
});
Route::get('/test', function () {
  
    $route = "https://cscs.chambertrust.ir:8443/services/rest/cardService/memberDirectoryIndexes";
    $headers = [
        "Content-Type" => "application/json",
        "userName" => "MemberDirectoryReader",
        "password" => "yA'wk`5sL=Y189kG|2|;",
    ];
    $body = [
        "fromDate" => "1396/01/01",
        "toDate" => "1398/04/28",
        "lastIndex" => 40,
        "pageSize" => 10,
    ];

    $r = @iccima_request_http($body, $route, "GET", $headers)['response_object'];


    dd($r);
});


require __DIR__ . "/webservice.php";
