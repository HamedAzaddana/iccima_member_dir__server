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
        if (!$token) {
            return ErrorResponse::error_403_api("Access Forbidden !");
        }
        $user_jwt = (object)\JWT::parse($token)->toArray();
        if (isset($user_jwt->Name) && isset($user_jwt->NId)) {
            $username  = $user_jwt->Name;
            $admin = AdminUser::where('national_code', $username)
                ->get()->first();
            $admin_object = $admin;
            $admin = $admin ? $admin->toArray() : null;
            $merchant = MerchantUser::where('card_no', $username)
                ->get()->first();
            $merchant_object = $merchant;
            $merchant = $merchant ? $merchant->toArray() : null;
        } else {
            return ErrorResponse::error_403_api("Access Forbidden !");
        }
        $guard = 'web_merchant'; //web_merchant , web_admin
        $user_id = 0;
        if (
            0
        ) {
            return ErrorResponse::error_403_api("Access Forbidden !");
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
