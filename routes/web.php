<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Http\Controllers\ErrorViewController;



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

Route::get('/', [MerchantController::class, 'homeAllView'])->name('home.index.view');
Route::get('/representatives/{hash_id}/{slug?}', [MerchantController::class, 'singleView'])->name('home.single.view');
Route::get('/errors/404', [ErrorViewController::class, 'page_404'])->name('errors.404.view');
Route::get('/errors/403', [ErrorViewController::class, 'page_403'])->name('errors.403.view');


require __DIR__ . "/webservice.php";
require __DIR__ . "/test.php";
