<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ErrorViewController;

Route::middleware('web')->group(function () {
    Route::get('/error/404', [ErrorViewController::class, 'page_404'])->name('errors.404.view');
    Route::get('/error/403', [ErrorViewController::class, 'page_403'])->name('errors.403.view');
});

