<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomePageController;



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
    // 397229
    $index="397229";
    $route = env("CARDS_API_URL") . "fullMemberDirectoryInfo/$index";
    $headers = [
        "Content-Type" => "application/json",
        "userName" => env("CARDS_API_USERNAME"),
        "password" => env("CARDS_API_PASSWORD"),
    ];
    $r = @iccima_request_http([], $route, "GET", $headers)['response_object'];
    dd($r);
});


require __DIR__ . "/webservice.php";
