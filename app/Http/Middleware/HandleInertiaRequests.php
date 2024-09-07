<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user_array = iccima_get_current_user();
        $_GL = ___callLang();
        $shared_data = [
            '_GL' => $_GL,
            'iccima.user.lang' => iccima_get_sess_lang(),
            'iccima.user.obj' => iccima_get_current_user_safe(),
            'iccima.user.type' => iccima_get_current_user_type(),
            'iccima.user.__token' => request()->session()->get('sso_token', ""),
            'iccima.user.__id' =>
            iccima_get_current_user_id() ? iccima_hashid_encode(iccima_get_current_user_id()) : "",
            'iccima.user.spl' => route("home.single.view", [
                'hash_id' =>
                iccima_hashid_encode(iccima_get_current_user_id()),
                'slug' => 'profile'
            ]),
            'iccima.links.login' => env("LOGIN_URL_SSO"),
            'iccima.links.logout' => route("auth.logout"),
            'iccima.links.get_captcha' => route("ws.captcha.reload"),
            'iccima.links.validate_captcha' => route("ws.captcha.validate"),
            'iccima.links.ch_lang' => route("ws.change.lang"),
            'iccima.links.inc_view' => route("ws.merchant.inc_view"),
            'iccima.links.onlines' => route("ws.users.count_online"),
        ];
        if (iccima_get_current_user_id() && iccima_get_current_user_type() == "admin") {
            $shared_data["iccima.adminPanel.dashboard"] = route("admin.dashboard.view");
            $shared_data["iccima.adminPanel.forms"] = route("admin.forms.view");
            $shared_data["iccima.ws.admin.dashboard"] = route("ws.admin.dashboard");
            $shared_data["iccima.ws.admin.forms"] = route("ws.admin.forms");
            $shared_data["iccima.ws.admin.form_status"] = route("ws.admin.form_status");
            $shared_data["iccima.ws.admin.form_show_in_index"] = route("ws.admin.form_show_in_index");
        }
        return array_merge(parent::share($request),  $shared_data);
    }
}
