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

Route::get('/test2', function () {});
Route::get('/test', function () {
    //    dd(MerchantUser::prepare_save_db_sql(CardsDataService::getDataByIndex("612001")));
    // MerchantUser::createIndexEls();
    // MerchantUser::sync_data_indexes();
    dd(MerchantUser::get_data_els_filter([],1));
});


require __DIR__ . "/webservice.php";
