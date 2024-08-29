<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WebService\MerchantController;
use App\Http\Controllers\WebService\PresetController;
use App\Http\Controllers\WebService\CaptchaController;



Route::middleware('is_api_user')->prefix("webservice")->group(function () {
    Route::middleware(['throttle:25,1'])->group(function () {
        Route::post('/reload-captcha', [CaptchaController::class, 'reloadCaptcha'])->name('ws.captcha.reload');
        Route::post('/validate-captcha', [CaptchaController::class, 'validateCaptcha'])->name('ws.captcha.validate');    
    });
    Route::post('/merchants/view/increment', [MerchantController::class, 'increment_view'])->name('ws.merchant.inc_view');
    Route::post('/merchants/get/index', [MerchantController::class, 'index'])->name('ws.search.index');
    Route::post('/merchants/get/single', [MerchantController::class, 'single'])->name('ws.search.single');
    Route::post('/change/lang/user', [MerchantController::class, 'change_lang'])->name('ws.change.lang');
    Route::post('/search/get_filter_vars', [PresetController::class, 'get_filters_var'])->name('ws.search.get_filters_var');

    Route::middleware('is_merchant_in')->group(function () {
        Route::post('/merchants/update/values', [MerchantController::class, 'saveFormValsUnconf'])->name('ws.search.saveVals');
        Route::post('/merchants/update/values/delete/brand_image', [MerchantController::class, 'deleteBrandLogo'])->name('ws.search.delBrImg');
    });
});
