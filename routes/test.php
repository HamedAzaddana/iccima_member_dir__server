<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Models\MerchantUser as MerchantUserModel;

Route::get('/test2', function () {
    // iccima_change_sess_lang("Persian");
    dd(iccima_get_sess_lang());
});
Route::get('/test', function () {
    //  dd(MerchantUserModel::where("co_email", "jalaliiebxi@yahoo.com")->first());
});
