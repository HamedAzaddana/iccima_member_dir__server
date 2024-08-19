<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Helpers\Pdate;
use App\Models\AdminUser;
use App\Models\MerchantUser;
use Illuminate\Support\Facades\DB;


class AuthenticationController extends Controller
{

    public function loginSso()
    {
        $this->logoutSession();
        $guard = 'web_merchant'; //web_merchant , web_admin
        $user_id = 0;
        $token = request()->token;
        request()->session()->put('sso_token', $token);
        if (!$token) {
            return redirect()->away(env('LOGIN_URL_SSO'));
        }
        if (iccima_get_current_user()) {
            return redirect()->route('home.index.view');
        }
        $sso_url = env('SSO_SERVICE_URL');
        $route = "$sso_url/api/Authentication/ValidateJwtToken?token=$token";
        $input = [];
        $headers = [];
        $r = iccima_request_http($input, $route, "POST", $headers);
        $response_object = $r['response_object'];
        $status_code = $r['status_code'];
        $error = $r['error'];

        if ($status_code == 200 && $response_object['data'] && $response_object['isSuccess']) {
            $user_jwt = (object)\JWT::parse($token)->toArray();
            if (isset($user_jwt->Name) && isset($user_jwt->NId)) {
                $username  = $user_jwt->Name;
                $national_code  = $user_jwt->NId;
                $info_user  = $user_jwt->Info;
                $admin = AdminUser::where('national_code', $username)
                    ->get()->first();
                $admin_object = $admin;
                $admin = $admin ? $admin->toArray() : null;
                $merchant = MerchantUser::where('card_no', $username)
                    ->get()->first();
                $merchant_object = $merchant;
                $merchant = $merchant ? $merchant->toArray() : null;
                if (!$merchant && !$admin) {
                    return redirect()->away(env('LOGIN_URL_SSO'));
                }
                if ($admin) {
                    $guard = 'web_admin';
                    $user_id = $admin['id'];
                }
                if ($merchant) {
                    $guard = 'web_merchant';
                    $user_id = $merchant['id'];
                }

                Auth::guard($guard)
                    ->loginUsingId($user_id);
                if ($admin) {
                    $admin_object->update([
                        'last_login' => Pdate::persianTimeStampNow()
                    ]);
                }
                if ($merchant) {
                    $merchant_object->update([
                        'last_login' => Pdate::persianTimeStampNow()
                    ]);
                }
                return redirect()->route('home.index.view');
            } else {
                return redirect()->away(env('LOGIN_URL_SSO'));
            }
        } else {
            return redirect()->away(env('LOGIN_URL_SSO'));
        }
    }
    public function login($nc)
    {
        $this->logoutSession();
        $national_code = $nc;
        $guard = 'web_merchant';
        $user_id = 0;
        $admin = AdminUser::where('national_code', $national_code)->get()->first();
        $admin_object = $admin;
        $admin = $admin ? $admin->toArray() : null;

        $merchant = MerchantUser::where('card_no', $national_code)->get()->first();
        $merchant_object = $merchant;
        $merchant = $merchant ? $merchant->toArray() : null;

        if (!$merchant && !$admin) {
            return redirect()->back();
        }
        $user_type = 'merchant';
        if ($merchant) {
            $guard = 'web_merchant';
            $user_id = $merchant['id'];
            $user_type = 'merchant';
        }
        if ($admin) {
            $guard = 'web_admin';
            $user_id = $admin['id'];
            $user_type = 'admin';
        }

        Auth::guard($guard)
            ->loginUsingId($user_id);
            
        if ($admin) {
            $admin_object->update([
                'last_login' => Pdate::persianTimeStampNow()
            ]);
        }
        if ($merchant) {
            $merchant_object->update([
                'last_login' => Pdate::persianTimeStampNow()
            ]);
        }
        return redirect()->route('home.index.view');
    }
    public function logout()
    {
        $this->logoutSession();

        return redirect()->route('home.index.view');
    }
    public function logoutSession()
    {
        if (auth()->guard('web_merchant')->check()) {
            Auth::guard('web_merchant')->logout();
        }
        if (auth()->guard('web_admin')->check()) {
            Auth::guard('web_admin')->logout();
        }
    }
}
