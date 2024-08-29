<?php

namespace App\Http\Middleware;

use App\Exceptions\ErrorResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WebserviceValid
{

    public function handle(Request $request, Closure $next): Response
    {
        $username_key = env("AUTH_WS_USERNAME", "");
        $password_key = env("AUTH_WS_PASSWORD", "");
        $username = $request->header('ICCIMA-AUTH-USERNAME');
        $password = $request->header('ICCIMA-AUTH-PASSWORD');
        $url_ref = @$_SERVER['HTTP_REFERER'];
        $error_403 = "";
        if (
            $username != $username_key ||
            $password != $password_key
        ) {
            $error_403 = "Access Forbidden !";
        }
        if (request()->isJson()) {
            if ($error_403) {
                return ErrorResponse::error_403_api($error_403);
            } else {
                return $this->goNext($request, $next);
            }
        }
        if ($error_403) {
            abort(403);
        } else {
            return $next($request);
        }
    }
    public function goNext(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization, Application, Accept, ICCIMA-AUTH-PASSWORD, ICCIMA-AUTH-USERNAME');
    }
}
