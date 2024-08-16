<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MerchantUser as MerchantUserModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MerchantController extends Controller
{
    public function homeAllView()
    {
        $route_ws_search_index = route("ws.search.index");
        $route_ws_search_get_fv = route("ws.search.get_filters_var");
        
        return Inertia::render('Index', [
            'ws_s_route'=>$route_ws_search_index,
            'ws_search_get_fv'=>$route_ws_search_get_fv,
        ]);
    }
    public function singleView($hash_id)
    {
        // dd(iccima_hashid_decode($hash_id));
        $route_ws_get_single = route("ws.search.single");
        $route_404_page = route("errors.404.view");
        return Inertia::render('SingleMerchant',[
            'hid'=>$hash_id,
            'route_ws_get_single'=>$route_ws_get_single,
            'route_404_page'=>$route_404_page,
        ]);
    }
}
