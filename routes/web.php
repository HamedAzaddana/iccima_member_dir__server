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
Route::get('/test', function () {
    $S_valid_domains = env("VALID_WS_DOMAINS", "");
    if ($S_valid_domains) {
        $valid_domains = explode(',', $S_valid_domains);
        $current_url_ref = @$_SERVER['HTTP_REFERER'];
        $site = parse_url(env("APP_URL"));
        $domain_site = $site['host'];
        dd($valid_domains,$current_url_ref,$domain_site);
    }
});


require __DIR__ . "/webservice.php";
