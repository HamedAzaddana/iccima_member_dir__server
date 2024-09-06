<?php

use Illuminate\Support\Facades\Route;

Route::middleware('is_admin_in')->prefix("administrator")->group(function () {
    // Route::get('/dashboard', [PanelController::class, 'dashboard'])->name('admin.dashboard.view');
    // Route::get('/merchant/forms', [PanelController::class, 'forms'])->name('admin.forms.view');
});

require __DIR__ . "/webservice.php";
require __DIR__ . "/errors.php";
require __DIR__ . "/test.php";
