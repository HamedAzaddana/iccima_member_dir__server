<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MerchantUser as MerchantUserModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PanelController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
        ]);
    }
    public function forms()
    {
        return Inertia::render('Admin/Forms', [
        ]);
    }
}
