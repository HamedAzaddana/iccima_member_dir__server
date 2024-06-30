<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WebserviceValid
{

    public function handle(Request $request, Closure $next): Response
    {
        if (env("WS_WORK_TYPE", "") == "test") {
            return $this->goNext($request, $next);
        }
        $username_key = env("AUTH_WS_USERNAME", "");
        $password_key = env("AUTH_WS_PASSWORD", "");
        $username = $request->header('ICCIMA-AUTH-USERNAME');
        $password = $request->header('ICCIMA-AUTH-PASSWORD');
        $url_ref = @$_SERVER['HTTP_REFERER'];

        if (
            $username != $username_key ||
            $password != $password_key
        ) {
            return response()->json([
                'msg' => "Access Forbidden !",
            ], 403);
        }

        return $this->goNext($request, $next);
    }
    public function goNext(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization, Application, Accept, ICCIMA-AUTH-PASSWORD, ICCIMA-AUTH-USERNAME');
    }
}
