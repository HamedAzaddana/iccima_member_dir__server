<?php

namespace App\Http\Controllers\WebService;

use App\Exceptions\ErrorResponse;
use App\Http\Controllers\Controller;


class CaptchaController extends Controller
{
    public function reloadCaptcha()
    {
        return response()->json(['captcha'=> captcha_src("default")]);
    }
}
