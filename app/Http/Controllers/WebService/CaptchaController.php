<?php

namespace App\Http\Controllers\WebService;

use App\Exceptions\ErrorResponse;
use App\Http\Controllers\Controller;


class CaptchaController extends Controller
{
    public function reloadCaptcha()
    {
        return response()->json(['captcha' => captcha_src("default")]);
    }
    public function validateCaptcha()
    {
        $input = request()->all();
        $input['continue_code'] = iccima_make_en_numbers($input['continue_code']);
        $response = [];
        $rules = ['continue_code' => 'required|captcha'];
        $validator = validator()->make($input, $rules);
        $errors = $validator->errors();
        if ($errors && count($errors) != 0) {
            $response = response()->json([
                'data' => [
                    "msg" => ___rlic("explore.captcha.error"),
                    'validator' => $errors
                ],
                'req' => request()->all(),
            ], 422);
        } else {
            $response = response()->json([
                'data' => [],
                'req' => request()->all(),
            ], 200);
        }
        return $response;
    }
}
