<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Services\CardsData;
use App\Models\IndexNumberApi;
use App\Models\MerchantUser as MerchantUserModel;
use Illuminate\Support\Facades\DB;



Route::get('/test2', function () {
    // iccima_change_sess_lang("Persian");
    // dd(MerchantUserModel::where("card_no","10260117348")->first()->toArray());
    dd($_data = CardsData::getDataByIndex("394834"));
});
Route::get('/test', function () {
    $index="392688";
    $route = env("CARDS_API_URL") . "fullMemberDirectoryInfo/$index";
    $headers = [
        "Content-Type" => "application/json",
        "userName" => env("CARDS_API_USERNAME"),
        "password" => env("CARDS_API_PASSWORD"),
    ];
    $r = @iccima_request_http([], $route, "GET", $headers)['response_object'];
    dd($r);
});
