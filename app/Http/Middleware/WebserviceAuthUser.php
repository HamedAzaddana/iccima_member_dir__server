<?php

namespace App\Http\Middleware;

use App\Exceptions\ErrorResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\AdminUser;
use App\Models\MerchantUser;

class WebserviceAuthUser
{

    public function handle(Request $request, Closure $next): Response
    {
        $token = (int)$request->header('ICCIMA-AUTH-USER-TOKEN');
        $ui = iccima_get_validate_user_token($token);
        $ui_id = $ui['user_id'];
        $ui_type = $ui['user_type'];
        $error_403 ="";
        if (
            !$ui_id
        ) {
            $error_403 = "Access Forbidden Authentication !";
        }
        request()->session()->put('ws_iccima_user_id', $ui_id);
        request()->session()->put('ws_iccima_user_type', $ui_type);
        request()->session()->put('ws_iccima_user_current', iccima_user_by_params($ui_id, $ui_type));
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
