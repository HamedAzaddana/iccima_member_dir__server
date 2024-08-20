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
    // dd($_data = CardsData::getDataByIndex("394834"));
});
Route::get('/test', function () {
    // dd(iccima_get_current_user());
    $merchant = MerchantUserModel::find(8105);
    $merchant_e = $merchant->editable_user;
    dd($merchant->toArray(),$merchant_e);
});
