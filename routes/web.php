<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomePageController;
use App\Models\IndexNumberApi;
use App\Models\MerchantUser;
use Illuminate\Support\Facades\DB;
use App\Services\CardsData as CardsDataService;

// use App\Helpers\Pdate;
// use Elastic\Elasticsearch\ClientBuilder;
// use App\Models\CardsDataOracle;

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

    // dd(json_encode($r['MemberDirectoryBriefModel']->BizActivities,JSON_UNESCAPED_UNICODE));

    dd($r);
});
Route::get('/test', function () {
   dd(CardsDataService::getDataByIndex("612001"));
});


require __DIR__ . "/webservice.php";
