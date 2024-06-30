<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WebserviceValid
{

    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);

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

        return $next($request);
    }
}
