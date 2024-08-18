<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Helpers\Pdate;
use Illuminate\Support\Facades\DB;

class AuthenticationController extends Controller
{

    public function loginSso()
    {
        $this->logoutSession();
        $guard = 'web_merchant'; //web_admin
        $user_id = 0;
        $token = request()->token;
        request()->session()->put('sso_token', $token);
        if (!$token) {
            return redirect()->away(env('LOGIN_URL_SSO'));
        }
        if (iccima_get_current_user()) {
            return redirect()->to('/');
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
                $admin = AdminModel::where('username', $username)
                    ->orWhere('national_code', $national_code)
                    ->get()->first();
                $admin_object = $admin;
                $admin = $admin ? $admin->toArray() : null;

                $merchant = MerchantModel::where('username', $username)
                    ->orWhere('national_code', $national_code)
                    ->get()->first();
                $merchant_object = $merchant;
                $merchant = $merchant ? $merchant->toArray() : null;
                if (!$merchant && !$admin) {
                    return redirect()->away(env('LOGIN_URL_SSO'));
                }
                $user_obj = null;
                $user_status = 0;
                $user_type = 'merchant';
                if ($admin) {
                    $guard = 'webadmin';
                    $user_id = $admin['id'];
                    $user_obj = AdminModel::find($user_id);
                    $user_status = $user_obj->getStatusUser();
                    $user_type = 'admin';
                }
                if ($merchant) {
                    $guard = 'web';
                    $user_id = $merchant['id'];
                    $user_obj = MerchantModel::find($user_id);
                    $user_status = $user_obj->getStatusUser();
                    $user_type = 'merchant';
                }
                if (!$user_status) {
                    return redirect()->away(env('LOGIN_URL_SSO'));
                }
                Auth::guard($guard)
                    ->loginUsingId($user_id);
                if ($admin) {
                    $admin_object->update([
                        'last_login' => Pdate::persianTimeStampNow()
                    ]);
                    $login_id_t = DB::table('user_time_spent')->insertGetId(array(
                        'user_id' => $user_id,
                        'user_type' => $user_type,
                        'last_login' => Pdate::persianTimeStampNow(),
                        'last_load_page' => Pdate::persianTimeStampNow(),
                    ));
                    request()->session()->put('login_id_t', $login_id_t);
                }
                if ($merchant) {
                    $merchant_object->update([
                        'last_login' => Pdate::persianTimeStampNow()
                    ]);
                    $login_id_t = DB::table('user_time_spent')->insertGetId(array(
                        'user_id' => $user_id,
                        'user_type' => $user_type,
                        'last_login' => Pdate::persianTimeStampNow(),
                        'last_load_page' => Pdate::persianTimeStampNow(),
                    ));
                    request()->session()->put('login_id_t', $login_id_t);
                }
                if (request()->session()->has('path_icc_last')) {
                    $path_icc_last = request()->session()->get('path_icc_last');
                    request()->session()->forget('path_icc_last');
                    return redirect()->to($path_icc_last);
                } else {
                    $provider_roles = current_user_get_provider_roles();
                    // if ($provider_roles) {
                    //     return redirect()->route('admin.meeting.providers');
                    // }
                    return redirect()->route('home');
                }
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
        $guard = 'web';
        $user_id = 0;
        $admin = AdminModel::where('national_code', $national_code)->get()->first();
        $admin_object = $admin;
        $admin = $admin ? $admin->toArray() : null;

        $merchant = MerchantModel::where('national_code', $national_code)->get()->first();
        $merchant_object = $merchant;
        $merchant = $merchant ? $merchant->toArray() : null;

        if (!$merchant && !$admin) {
            return redirect()->back();
        }
        $user_type = 'merchant';
        if ($merchant) {
            $guard = 'web';
            $user_id = $merchant['id'];
            $user_type = 'merchant';
        }
        if ($admin) {
            $guard = 'webadmin';
            $user_id = $admin['id'];
            $user_type = 'admin';
        }


        Auth::guard($guard)
            ->loginUsingId($user_id);
        if ($admin) {
            $admin_object->update([
                'last_login' => Pdate::persianTimeStampNow()
            ]);
            $login_id_t = DB::table('user_time_spent')->insertGetId(array(
                'user_id' => $user_id,
                'user_type' => $user_type,
                'last_login' => Pdate::persianTimeStampNow(),
                'last_load_page' => Pdate::persianTimeStampNow(),
            ));
            request()->session()->put('login_id_t', $login_id_t);
        }
        if ($merchant) {
            $merchant_object->update([
                'last_login' => Pdate::persianTimeStampNow()
            ]);
            $login_id_t = DB::table('user_time_spent')->insertGetId(array(
                'user_id' => $user_id,
                'user_type' => $user_type,
                'last_login' => Pdate::persianTimeStampNow(),
                'last_load_page' => Pdate::persianTimeStampNow(),
            ));
            request()->session()->put('login_id_t', $login_id_t);
        }
        $provider_roles = current_user_get_provider_roles();
        // if ($provider_roles) {
        //     return redirect()->route('admin.meeting.providers');
        // }
        return redirect()->route('home');
    }
    public function logout()
    {
        $this->logoutSession();

        return redirect()->route('home');
    }
    public function logoutSession()
    {
        if (get_user_admin()) {
            Auth::guard('webadmin')->logout();
        }
        if (get_user_merchant()) {
            Auth::guard('web')->logout();
        }
    }
}
