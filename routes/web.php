<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Http\Controllers\Admin\PanelController;



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

Route::get('/authentication/loginSso', [AuthenticationController::class, 'loginSso']);
Route::get('/authentication/logOut', [AuthenticationController::class, 'logout'])->name("auth.logout");
Route::get('/authentication/login/{nc}', [AuthenticationController::class, 'login']);

Route::middleware('is_admin_in')->prefix("administrator")->group(function () {
    Route::get('/dashboard', [PanelController::class, 'dashboard'])->name('admin.dashboard.view');
    Route::get('/merchant/forms', [PanelController::class, 'forms'])->name('admin.forms.view');
});

require_once __DIR__ . "/webservice.php";
require_once __DIR__ . "/pages_error.php";
require_once __DIR__ . "/test.php";
