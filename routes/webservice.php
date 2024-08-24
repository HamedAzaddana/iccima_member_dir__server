<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WebService\MerchantController;
use App\Http\Controllers\WebService\PresetController;

Route::middleware('is_api_user')->prefix("webservice")->group(function () {

   
    Route::post('/merchants/get/index', [MerchantController::class, 'index'])->name('ws.search.index');
    Route::post('/merchants/get/single', [MerchantController::class, 'single'])->name('ws.search.single');
    Route::post('/search/get_filter_vars', [PresetController::class, 'get_filters_var'])->name('ws.search.get_filters_var');
   
    Route::middleware('is_merchant_in')->group(function () {
        Route::post('/merchants/update/values', [MerchantController::class, 'saveFormValsUnconf'])->name('ws.search.saveVals');
        Route::post('/merchants/update/values/delete/brand_image', [MerchantController::class, 'deleteBrandLogo'])->name('ws.search.delBrImg');
    });
    
});
