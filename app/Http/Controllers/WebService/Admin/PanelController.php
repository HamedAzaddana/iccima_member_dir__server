<?php

namespace App\Http\Controllers\WebService\Admin;

use App\Http\Controllers\Controller;
use App\Models\MerchantUser;
use Illuminate\Http\Request;


class PanelController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'data' => [],
            'req' => request()->all(),
        ], 200);
    }
    public function forms()
    {
        return response()->json([
            'data' => [],
            'req' => request()->all(),
        ], 200);
    }
    public function form_status()
    {
        return response()->json([
            'data' => [],
            'req' => request()->all(),
        ], 200);
    }
}
