<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomePageController;
use App\Helpers\Pdate;
use Elastic\Elasticsearch\ClientBuilder;
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
    // dd(config('database.connections.elasticsearch.hosts'));

    // $client = ClientBuilder::create()
    //     ->setHosts([env("ELASTICSEARCH_URL")])
    //     ->setApiKey(env("ELASTICSEARCH_API_KEY"))
    //     ->build();
});


require __DIR__ . "/webservice.php";
