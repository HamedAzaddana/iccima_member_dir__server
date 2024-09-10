<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Services\CardsData;
use App\Models\IndexNumberApi;
use App\Models\MerchantUser;
use App\Models\MerchantEUser;
use App\Models\AdminUser;
use App\Models\Preset;
use Illuminate\Support\Facades\DB;
use App\Helpers\Pdate;
use Klevze\OnlineUsers\Facades\OnlineUsers;


Route::get('/test2', function () {
    // dd($_SERVER);
    // dd(___callLang());
    // iccima_change_sess_lang("Persian");
    // dd(iccima_lang_str('nav.home'));
    // iccima_change_sess_lang("Persian");
    // dd(MerchantUserModel::where("card_no","10260117348")->first()->toArray());
    // dd($_data = CardsData::getDataByIndex("558177"));
});
Route::get('/test', function () {
    // $from_ymd = Pdate::getYMDstandardDate(\Carbon\Carbon::now()->addDay(-7)->timestamp);
    // $to_ymd = Pdate::getYMDstandardDate(\Carbon\Carbon::now()->addDay(-6)->timestamp);

    // $route = env("CARDS_API_URL") . "memberDirectoryIndexes";
    // $headers = [
    //     "Content-Type" => "application/json",
    //     "userName" => env("CARDS_API_USERNAME"),
    //     "password" => env("CARDS_API_PASSWORD"),
    // ];
    // $body = [
    //     "fromDate" => $from_ymd,
    //     "toDate" => $to_ymd,
    //     "lastIndex" => 1,
    //     "pageSize" => 160000,
    // ];
    // $indexes = (array)@iccima_request_http($body, $route, "GET", $headers)['response_object']['memberDirectoryIndexes'];
    // dd($indexes, $body);
});
