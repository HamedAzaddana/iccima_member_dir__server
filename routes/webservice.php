<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WebService\SearchController;

Route::middleware('webservice_gate')->prefix("webservice")->group(function () {
    Route::post('/search/index', [SearchController::class, 'index'])->name('ws.search.index');
    Route::post('/search/get_filter_vars', [SearchController::class, 'get_filters_var'])->name('ws.search.get_filters_var');
});
