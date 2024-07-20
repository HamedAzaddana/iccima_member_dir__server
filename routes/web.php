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
    // $oracle_data = CardsDataOracle::where("is_marked_as_delete", "0")
    //     ->pluck('card_no', 'mv_member_directory_id')
    //     ->toArray();
    // $duplicate_card_nos = array_values(iccima_get_duplicate_vals($oracle_data));
    // $dup_str = implode(" , ", $duplicate_card_nos);
    // iccima_log_custom($dup_str);
    // echo count($duplicate_card_nos);

    // $oracle_data_uniq = array_unique($oracle_data);
    // dd(count($oracle_data), count($oracle_data_uniq));


});


require __DIR__ . "/webservice.php";
