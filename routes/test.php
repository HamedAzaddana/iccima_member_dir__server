<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Models\MerchantUser as MerchantUserModel;

Route::get('/test2', function () {
    dd($merchant = MerchantUserModel::find(1)->toArray());
});
Route::get('/test', function () {
    // $client = iccima_els_client();
    // $params = [
    //     'index' => 'iccima_cards_data_merchants',
    //     "body" => [
    //         "query" => [
    //             "bool" => [
    //                 "must" => [
    //                     "multi_match" => [
    //                         'query' => "دارو",
    //                         'fields' => [
    //                             'owner_fullname',
    //                             'co_title',
    //                             'biz_activities',
    //                             'biz_activitiy_goods',
    //                             'coo_biz_activities',
    //                             'biz_act_goods_hs_codes',
    //                             'shared_chambers',
    //                             'specialized_committees',
    //                             'guild_types',
    //                         ],
    //                     ],
    //                 ],
    //                 "filter" => [
    //                     ["match" => ["province" => "تهران"]],
    //                     ["match" => ["group_activity_type" => "صنعت"]],
    //                 ],
    //             ],
    //         ],
    //     ],
    //     "size" => 50,
    // ];
    // $response = $client->search($params);
    // dd(iccima_prepare_get_db_elastic($response->asArray()));
});
