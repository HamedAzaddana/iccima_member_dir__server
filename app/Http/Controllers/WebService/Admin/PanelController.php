<?php

namespace App\Http\Controllers\WebService\Admin;

use App\Http\Controllers\Controller;
use App\Models\MerchantEUser;
use App\Models\MerchantUser;
use App\Exceptions\ErrorResponse;
use Illuminate\Http\Request;
use App\Helpers\Pdate;


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
        foreach ($merchants as &$item) {
            $item['_id'] = iccima_hashid_encode($item['original_user']['id']);
            $item['_jalali_updated_at'] = iccima_get_str_date_from_db($item['last_updated_at']);
            $item['_jalali_last_login'] = iccima_get_str_date_from_db($item['original_user']['last_login']);
            $item['_show_in_index'] =$item['original_user']['show_in_index'];

            unset($item['id']);
            unset($item['last_updated_at']);
            unset($item['original_user']['id']);
            unset($item['original_user']['last_login']);
            unset($item['original_user']['card_no']);
            unset($item['original_user']['show_in_index']);
            unset($item['card_no']);
            foreach ($mutil_langs as $mutil_lang) {
                $item["_$mutil_lang"] = @json_decode($item[$mutil_lang])?->$lang;
                $item["_$mutil_lang"] = $item["_$mutil_lang"] == "null" || !$item["_$mutil_lang"] ? null : $item["_$mutil_lang"];
                unset($item[$mutil_lang]);
            }
            foreach ($mutil_langs_original as $mutil_lang) {
                $item['original_user']["_$mutil_lang"] = @json_decode($item['original_user'][$mutil_lang])?->$lang;
                $item['original_user']["_$mutil_lang"] = $item['original_user']["_$mutil_lang"] == "null" || !$item['original_user']["_$mutil_lang"] ? null : $item['original_user']["_$mutil_lang"];
                unset($item['original_user'][$mutil_lang]);
            }
            $item['_spl'] = route("home.single.view", [
                'hash_id' => $item['_id'],
                'slug' => 'viaAdminPanel'
            ]);
        }
        return response()->json([
            'data' => $merchants->toArray(),
            'req' => request()->all(),
        ], 200);
    }
    public function form_status()
    {
        $hid = request("hid");
        $new_status_confirm = (int)request("status");

        $merchant_id = iccima_hashid_decode($hid);
        $merchant = MerchantUser::find($merchant_id);
        if (!$merchant || !$merchant_id || !$hid) {
            return ErrorResponse::error_404_api("Not Found Resource Merchant !");
        }
        if ($new_status_confirm == 1 || $new_status_confirm == 0) {
            if (!$merchant?->editable_user) {
                MerchantEUser::firstOrCreate(
                    ['card_no' => $merchant->card_no],
                    [
                        "last_updated_at" => Pdate::persianTimeStampNow(),
                        "confirmed" => 0,
                    ]
                );
                $merchant = MerchantUser::find($merchant_id);
            }
            $merchant->editable_user->update([
                'confirmed' => $new_status_confirm,
                'last_updated_at' => Pdate::persianTimeStampNow(),
            ]);
            return response()->json([
                'data' => [],
                'req' => request()->all(),
            ], 200);
        } else {
            return response()->json([
                'data' => [],
                'req' => request()->all(),
            ], 422);
        }
    }
    public function form_show_in_index()
    {
        $hid = request("hid");
        $new_status_show = (int)request("status");

        $merchant_id = iccima_hashid_decode($hid);
        $merchant = MerchantUser::find($merchant_id);
        if (!$merchant || !$merchant_id || !$hid) {
            return ErrorResponse::error_404_api("Not Found Resource Merchant !");
        }
        if ($new_status_show == 1 || $new_status_show == 0) {
            $merchant->update([
                'show_in_index' => $new_status_show,
                'last_updated_at' => Pdate::persianTimeStampNow(),
            ]);
            return response()->json([
                'data' => [],
                'req' => request()->all(),
            ], 200);
        } else {
            return response()->json([
                'data' => [],
                'req' => request()->all(),
            ], 422);
        }
    }
}
