<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WebserviceValid
{

    public function handle(Request $request, Closure $next): Response
    {
        // if (!str_contains($_SERVER['HTTP_REFERER'], env('APP_URL'))) {
        //     return response()->json([
        //         'msg' => "Access Forbidden !",
        //     ], 403);
        // }
        return $next($request);
    }
}
