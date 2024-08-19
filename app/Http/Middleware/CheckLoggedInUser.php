<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Helpers\Pdate;


class CheckLoggedInUser
{

    public function handle(Request $request, Closure $next)
    {
        $current_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $path_continue = $current_url;
        if (iccima_get_current_user_type() !== "guest") {
            return $next($request);
        }
        request()->session()->put('path_icc_last', $path_continue);
        return redirect()->away(env('LOGIN_URL_SSO'));
    }
}
