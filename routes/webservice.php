<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WebService\MerchantController;
use App\Http\Controllers\WebService\PresetController;
use App\Http\Controllers\WebService\CaptchaController;
use App\Http\Controllers\WebService\Admin\PanelController;

Route::middleware('is_api_user')->prefix("webservice")->group(function () {
    Route::post('/users/count/online', [MerchantController::class, 'count_online_users'])->name('ws.users.count_online');

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
    Route::middleware('is_admin_in')->prefix("administrator")->group(function () {
        Route::post('/dashboard', [PanelController::class, 'dashboard'])->name('ws.admin.dashboard');
        Route::post('/merchant/form/all', [PanelController::class, 'forms'])->name('ws.admin.forms');
        Route::post('/merchant/form/status', [PanelController::class, 'form_status'])->name('ws.admin.form_status');
        Route::post('/merchant/form/show_in_index', [PanelController::class, 'form_show_in_index'])->name('ws.admin.form_show_in_index');
    });
});
