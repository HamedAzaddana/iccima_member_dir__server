<?php

namespace App\Http\Controllers\WebService\Admin;

use App\Http\Controllers\Controller;
use App\Models\MerchantEUser;
use App\Models\MerchantUser;
use Illuminate\Http\Request;


class PanelController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'data' => [],
            'req' => request()->all(),
        ], 200);
    }
    public function forms()
    {
        $mutil_langs = MerchantUser::get_multi_lang_fields();
        $mutil_langs_original = MerchantUser::get_multi_lang_original_fields();
        $lang = iccima_get_sess_lang();
        $per_page = 20;
        $merchants = MerchantEUser::with(['original_user'])->paginate($per_page);
        foreach ($merchants as $key => &$item) {
            $original_user = $item['original_user'];
            $item['_id'] = iccima_hashid_encode($item['original_user']['id']);
            $item['_jalali_updated_at'] = $item['last_updated_at'] ? jdate($item['last_updated_at'])->format("Y/m/d H:i:s") : "";
            $item['_jalali_last_login'] = $item['original_user']['last_login'] ? jdate($item['original_user']['last_login'])->format("Y/m/d H:i:s") : "";
            unset($item['id']);
            unset($item['last_updated_at']);
            unset($item['original_user']['id']);
            unset($item['original_user']['last_login']);
            unset($item['original_user']['card_no']);
            unset($item['card_no']);
            foreach ($mutil_langs as $mutil_lang) {
                $item["_$mutil_lang"] = @json_decode($item[$mutil_lang])?->$lang;
                $item["_$mutil_lang"] = $item["_$mutil_lang"]=="null" || !$item["_$mutil_lang"] ? null : $item["_$mutil_lang"];
                unset($item[$mutil_lang]);
            }
            foreach ($mutil_langs_original as $mutil_lang) {
                $item['original_user']["_$mutil_lang"] = @json_decode($item['original_user'][$mutil_lang])?->$lang;
                $item['original_user']["_$mutil_lang"] = $item['original_user']["_$mutil_lang"]=="null" || !$item['original_user']["_$mutil_lang"] ? null : $item['original_user']["_$mutil_lang"];
                unset($item['original_user'][$mutil_lang]);
            }
        }
        return response()->json([
            'data' => $merchants->toArray(),
            'req' => request()->all(),
        ], 200);
     
    }
    public function form_status()
    {
        return response()->json([
            'data' => [],
            'req' => request()->all(),
        ], 200);
    }
}
