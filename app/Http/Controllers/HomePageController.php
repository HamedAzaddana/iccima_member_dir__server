<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomePageController extends Controller
{
    public function index(Request $request): Response
    {
        $route_ws_search_index = route("ws.search.index");
        $route_ws_search_get_fv = route("ws.search.get_filters_var");
        
        return Inertia::render('Home/Index', [
            'ws_s_route'=>$route_ws_search_index,
            'ws_search_get_fv'=>$route_ws_search_get_fv,
        ]);
    }
}
