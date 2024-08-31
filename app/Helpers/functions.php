<?php

use App\Models\AdminUser;
use App\Models\MerchantUser;
use App\Helpers\Logger;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use App\Helpers\IccString;
use Illuminate\Pagination\LengthAwarePaginator;

function iccima_make_en_numbers($str)
{
    return IccString::make_en($str);
}
function iccima_prepareSelect($arr)
{
    $output = [];
    foreach ($arr as $k => $v) {
        $element = [];
        $element['value'] = $k;
        $element['label'] = $v;
        $output[] = $element;
    }
    return $output;
}
function iccima_arabicToPers_conv($string)
{
    $arabic = array('ي', 'ك', 'ة');
    $farsi = array('ی', 'ک', 'ه');
    return str_replace($arabic, $farsi, $string);
}
function iccima_array_map_assoc(callable $callback, array $array, array ...$arrays)
{
    $keys = array_keys($array);
    array_unshift($arrays, $keys, $array);
    return array_combine($keys, array_map($callback, ...$arrays));
}
function iccima_els_client()
{
    return MerchantUser::get_els_client();
}
function iccima_prepare_get_db_elastic($data)
{
    return MerchantUser::prepare_get_db_elastic($data);
}
function iccima_log_custom($data)
{
    Logger::LogCustom($data);
}
function iccima_get_duplicate_vals($arr)
{
    return array_diff_assoc(
        $arr,
        array_unique($arr)
    );
}
function iccima_request_http($body, $route, $method, $headers = [])
{
    $curl = curl_init();
    $_headers = [];
    foreach ($headers as $header_K => $header_V) {
        $_headers[] = "$header_K:$header_V";
    }
    curl_setopt_array($curl, array(
        CURLOPT_URL => $route,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_POSTFIELDS => json_encode($body),
        CURLOPT_HTTPHEADER => $_headers
    ));
    $response = curl_exec($curl);
    $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    curl_close($curl);
    $response_object = json_decode(preg_replace('/\s+/', ' ', $response));
    $response_object = (array)$response_object;
    return [
        'response_object' => $response_object,
        'status_code' => $status_code,
        'error' => $error,
    ];
}
function iccima_hashid_encode($id)
{
    $h = new Hashids\Hashids(env("HASH_ID_SALT"), (int)env("MIN_HASH_LENGTH"));
    return $h->encode((int)$id);
}
function iccima_hashid_decode($hashed_id)
{
    $h = new Hashids\Hashids(env("HASH_ID_SALT"), (int)env("MIN_HASH_LENGTH"));
    return @$h->decode($hashed_id)[0];
}
function iccima_change_sess_lang($lang)
{
    // $lang : Persian , English
    request()->session()->put('current_browser_lang', $lang);
}
function iccima_get_sess_lang()
{
    // $lang : Persian , English
    return request()->session()->get('current_browser_lang') ?
        request()->session()->get('current_browser_lang') :
        "Persian";
}

function iccima_sluggify($str)
{
    $str = str_replace(" ", "-", $str);
    $str = str_replace("‌", "-", $str);
    return $str;
}
function iccima_get_current_user_safe($include_images = 0)
{
    $user = iccima_get_current_user($include_images);
    unset($user['index_number']);
    unset($user['card_no']);
    unset($user['id']);
    unset($user['card_no']);
    unset($user['last_updated_at']);
    unset($user['password']);
    unset($user['national_code']);
    return $user;
}
function iccima_get_current_user_image()
{
    return @iccima_get_current_user(1)['owner_image'];
}
function iccima_get_current_user_orm()
{
    $user_orm = null;
    if (auth()->guard('web_merchant')->check()) {
        $user_orm = auth()->guard('web_merchant')->user();
    }
    if (auth()->guard('web_admin')->check()) {
        $user_orm = auth()->guard('web_admin')->user();
    }
    return $user_orm;
}
function iccima_get_current_user($include_images = 0)
{
    $user_obj = null;
    if (auth()->guard('web_merchant')->check()) {
        $user_obj = auth()->guard('web_merchant')->user()->toArray();
    }
    if (auth()->guard('web_admin')->check()) {
        $user_obj = auth()->guard('web_admin')->user()->toArray();
    }
    $user_array = (array)$user_obj;
    if (!$include_images) {
        unset($user_array['co_image']);
        unset($user_array['owner_image']);
    }

    return $user_array;
}
function iccima_get_current_user_id()
{
    return (int)@iccima_get_current_user()['id'];
}
function iccima_user_by_params_safe($id, $type)
{
    $user = iccima_user_by_params($id, $type);
    unset($user['index_number']);
    unset($user['card_no']);
    unset($user['id']);
    unset($user['card_no']);
    unset($user['last_updated_at']);
    unset($user['password']);
    unset($user['national_code']);
    return $user;
}
function iccima_user_by_params($id, $type)
{
    $user = [];
    if ($type == "merchant") {
        $user = MerchantUser::find((int)$id)?->toArray();
    }
    if ($type == "admin") {
        $user = AdminUser::find((int)$id)?->toArray();
    }
    return (array)$user;
}
function iccima_get_current_user_type()
{
    $user_type = "guest";
    if (auth()->guard('web_merchant')->check()) {
        $user_type = "merchant";
    }
    if (auth()->guard('web_admin')->check()) {
        $user_type = "admin";
    }
    return $user_type;
}
function iccima_get_validate_user_token($token)
{
    $user_id = 0;
    $user_type = "guest";
    $clientIP = request()->ip();
    $is_valid_token_duration = (int)Cache::get("_utokenValid_" . $clientIP, 0);
    $continue_token_check = 0;
    $user_id_logged_in = iccima_get_current_user_id();
    if ((int)env('ICCIM_AUTH_WEB_INTERNAL')) {
        $user_id = iccima_get_current_user_id();
        $user_type = iccima_get_current_user_type();
    }
    if ($token && !(int)env('ICCIM_AUTH_WEB_INTERNAL')) {
        if (!$is_valid_token_duration) {
            $sso_url = env('SSO_SERVICE_URL');
            $route = "$sso_url/api/Authentication/ValidateJwtToken?token=$token";
            $input = [];
            $headers = [];
            $r = iccima_request_http($input, $route, "POST", $headers);
            $response_object = $r['response_object'];
            $status_code = $r['status_code'];
            $error = $r['error'];
            if ($status_code == 200 && $response_object['data'] && $response_object['isSuccess']) {
                Cache::put("_utokenValid_" . $clientIP, 1, (int)env('ICCIM_AUTH_VALID_TOKEN_DUR'));
                $continue_token_check = 1;
            } else {
                $continue_token_check = 0;
            }
        } else {
            $continue_token_check = 1;
        }
        //---
        if ($continue_token_check) {
            $user_jwt = (object)\JWT::parse($token)->toArray();
            if (isset($user_jwt->Name) && isset($user_jwt->NId)) {
                $username  = $user_jwt->Name;
                $admin = AdminUser::where('national_code', $username)
                    ->get()->first();
                $admin = $admin ? $admin->toArray() : [];
                $merchant = MerchantUser::where('card_no', $username)
                    ->get()->first();
                $merchant = $merchant ? $merchant->toArray() : [];
                if ($admin) {
                    $guard = 'web_admin';
                    $user_type = 'admin';
                    $user_id = $admin['id'];
                }
                if ($merchant) {
                    $guard = 'web_merchant';
                    $user_type = 'merchant';
                    $user_id = $merchant['id'];
                }
            }
            if (!$user_id_logged_in) {
                Auth::guard($guard)
                    ->loginUsingId($user_id);
            }
        }
    }
    return [
        'user_id' => $user_id,
        'user_type' => $user_type,
    ];
}
function iccima_upload_validate_image($file, $allowedTypes, $maxFileSize)
{

    $fileName = $file['name'];
    $fileSize = $file['size'];
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    // Check file type
    if (!in_array($fileType, $allowedTypes)) {
        return [
            'response' => 'error',
            'msg' => ___rlic("toast.error_file_type"),
        ];
    }

    // Check file size
    if ($fileSize > $maxFileSize) {
        return [
            'response' => 'error',
            'msg' => ___rlic("toast.error_file_size"),
        ];
    }
    return [
        'response' => 'success',
        'msg' => 'file uploaded successfully !',
    ];
}
function iccima_unlink_public_src($file_name_public)
{
    $full_upload_path = public_path() . $file_name_public;
    if ($file_name_public && file_exists($full_upload_path)) {
        unlink($full_upload_path);
    }
}
function iccima_upload_public_src($file, $path_public)
{
    $relative_path = "/uploads/$path_public/";
    $full_upload_path = public_path() . $relative_path;
    if (!is_dir($full_upload_path)) {
        mkdir($full_upload_path);
    }
    $rnd_real_name = iccima_get_rnd_str() . "." . pathinfo($file['name'], PATHINFO_EXTENSION);
    $file_name_path = $full_upload_path . $rnd_real_name;
    $url_path_public = "/uploads/$path_public/$rnd_real_name";
    move_uploaded_file(
        $file["tmp_name"],
        $file_name_path
    );
    return $url_path_public;
}

function iccima_get_rnd_str($l = 4)
{
    $r1 = bin2hex(random_bytes($l));
    $r2 = bin2hex(random_bytes($l));
    $r3 = bin2hex(random_bytes($l));
    $r4 = bin2hex(random_bytes($l));
    return  $r1 . "-" . $r2 . "-" . $r3 . "-" . $r4 . "-" . time();
}

function iccima_get_str_date_from_db($dateTimeDb)
{
    $dateTimeStr = "";
    $lang = iccima_get_sess_lang();
    if ($lang == "Persian") {
        $dateTimeStr = $dateTimeDb ? jdate($dateTimeDb)->format("Y/m/d , H:i") : "";
    } else {
        $dateTimeStr = $dateTimeDb ? \Carbon\Carbon::parse($dateTimeDb)->format('Y/m/d , H:i') : "";
    }
    return $dateTimeStr;
}
function iccima_abort_403()
{
    if (iccima_get_current_user_id()) {
        return abort(403);
    } else {
        return redirect()->away(env('LOGIN_URL_SSO'));
    }
}
function ___rlic($index)
{
    include(base_path() . '/global_lang/' . iccima_get_sess_lang() . '.php');

    global $__GLABAL_LANG;
    return (string)@$__GLABAL_LANG[$index];
}
function ___elic($index)
{
    echo ___rlic($index);
}
function ___callLang()
{
    include(base_path() . '/global_lang/' . iccima_get_sess_lang() . '.php');

    global $__GLABAL_LANG;
    return $__GLABAL_LANG;
}
