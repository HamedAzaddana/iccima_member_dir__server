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

    $client = iccima_els_client();
    $params = [
        'index' => 'iccima_cards_data_merchants',
        "body" => [
            "query" => [
                "bool" => [
                    "must" => [
                        "multi_match" => [
                            'query' => "ایمان فرجی نژادجهرمی",
                            'fields' => [
                                'owner_fullname',
                                // 'co_title',
                                // 'biz_activities',
                                // 'biz_activitiy_goods',
                                // 'coo_biz_activities',
                                // 'biz_act_goods_hs_codes',
                                // 'shared_chambers',
                                // 'specialized_committees',
                                // 'guild_types',
                            ],
                        ],
                    ],
                    // "filter" => [
                    //     ["match" => ["province" => "تهران"]],
                    //     ["match" => ["group_activity_type" => "صنعت"]],
                    // ],
                ],
            ],
        ],
        "size" => 50,
    ];
    $response = $client->search($params);
    dd(iccima_prepare_get_db_elastic($response->asArray()));
});


require __DIR__ . "/webservice.php";
