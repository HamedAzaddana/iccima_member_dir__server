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
        return array_merge(parent::share($request), [
            '_GL' => $_GL,
            'iccima.user.lang' => iccima_get_sess_lang(),
            'iccima.user.obj' => iccima_get_current_user_safe(),
            'iccima.user.type' => iccima_get_current_user_type(),
            'iccima.user.__token' => request()->session()->get('sso_token',""),
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
        ]);
    }
}
