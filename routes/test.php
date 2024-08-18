<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Models\IndexNumberApi;
use App\Models\MerchantUser as MerchantUserModel;
use Illuminate\Support\Facades\DB;



Route::get('/test2', function () {
    // iccima_change_sess_lang("Persian");
    dd(iccima_get_sess_lang());
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
