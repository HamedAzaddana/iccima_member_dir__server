<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WebService\MerchantController;
use App\Http\Controllers\WebService\PresetController;

Route::middleware('webservice_gate')->prefix("webservice")->group(function () {
    $method_post = "post";
    $method_put = "put";
    $method_delete = "delete";
    if (env("WS_WORK_TYPE", "") == "test") {
        $method_post = "any";
        $method_put = "any";
        $method_delete = "any";
    }
    Route::{"$method_post"}('/merchants/get/index', [MerchantController::class, 'index'])->name('ws.search.index');
    Route::{"$method_post"}('/merchants/get/single', [MerchantController::class, 'single'])->name('ws.search.single');
    Route::{"$method_post"}('/merchants/update/values', [MerchantController::class, 'saveFormValsUnconf'])->name('ws.search.saveVals');
    Route::{"$method_post"}('/merchants/update/values/delete/brand_image', [MerchantController::class, 'deleteBrandLogo'])->name('ws.search.delBrImg');
    Route::{"$method_post"}('/search/get_filter_vars', [PresetController::class, 'get_filters_var'])->name('ws.search.get_filters_var');
});
