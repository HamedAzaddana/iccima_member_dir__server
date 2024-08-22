<?php

use App\Models\MerchantUser;
use App\Helpers\Logger;

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
function iccima_get_current_user_image()
{
    return @iccima_get_current_user(1)['owner_image'];
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
    if (!$include_images) {
        unset($user_obj['co_image']);
        unset($user_obj['owner_image']);
    }

    return (array)$user_obj;
}
function iccima_get_current_user_id()
{
    return (int)@iccima_get_current_user()['id'];
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
    //check : env('ICCIM_AUTH_WEB_INTERNAL')
    if (!$token) {
        return false;
    }
}
