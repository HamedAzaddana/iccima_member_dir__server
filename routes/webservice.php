<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WebService\SearchController;

Route::middleware('webservice_gate')->prefix("webservice")->group(function () {
    $method_post = "post";
    $method_put = "put";
    $method_delete = "delete";
    if (env("WS_WORK_TYPE", "") == "test") {
        $method_post = "any";
        $method_put = "any";
        $method_delete = "any";
    }
    Route::{"$method_post"}('/search/index', [SearchController::class, 'index'])->name('ws.search.index');
    Route::{"$method_post"}('/search/get_filter_vars', [SearchController::class, 'get_filters_var'])->name('ws.search.get_filters_var');
    Route::{"$method_post"}('/search/makeFake', [SearchController::class, 'makeFake'])->name('ws.search.makeFake');
});
