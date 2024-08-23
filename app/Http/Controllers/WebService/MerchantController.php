<?php

namespace App\Http\Controllers\WebService;

use App\Exceptions\ErrorResponse;
use App\Http\Controllers\Controller;
use App\Models\MerchantUser as MerchantUserModel;
use App\Models\MerchantEUser as MerchantEUserModel;
use App\Models\Preset as PresetModel;
use App\Helpers\Pdate;

class MerchantController extends Controller
{
    public function index()
    {
        $last_params = (array)request()->session()->get('params_filter_user');
        $last_more_loaded = (int)@$last_params['loaded_cnt'];
        $load_more = (int)env("LOAD_MORE_DATA", 30);
        $params = request()->all();
        if (@$params['more']) {
            $now_loading = $last_more_loaded + $load_more;
        } else {
            $now_loading = $load_more;
        }
        $params['show_more_btn'] = 1;
        $params['loaded_cnt'] = $now_loading;
        request()->session()->put('params_filter_user', $params);
        $records_load = MerchantUserModel::get_data_els_filter($params, $now_loading);
        if ($now_loading > count($records_load)) {
            $params['show_more_btn'] = 0;
        }
        return response()->json([
            'data' => $records_load,
            'req' => $params,
        ], 200);
    }
    public function single()
    {
        $hid = request("hid");
        $merchant_id = iccima_hashid_decode($hid);
        $merchant = MerchantUserModel::find($merchant_id);
        $merchant_e = [];
        if ($merchant) {
            $merchant_e = $merchant->editable_user ? $merchant->editable_user->toArray() : [];
        }
        if (!$merchant || !$merchant_id || !$hid) {
            return ErrorResponse::error_404_api("Not Found Resource Merchant !");
        }
        $merchant = $merchant->toArray();
        $merchant['__id'] = $hid;
        $merchant['__merchant_e'] = $merchant_e;
        return response()->json([
            'data' => $merchant,
            'req' => request()->all(),
        ], 200);
    }
    public function saveFormValsUnconf()
    {
        $save_indexes = [
            "brand_title",
            "co_phone",
            "co_fax",
            "co_website",
            "co_main_address",
            "shared_chambers",
            "specialized_committees",
            "guild_types",
        ];
        $multi_lang_indexed = [
            "brand_title",
            "co_main_address",
            "shared_chambers",
            "specialized_committees",
            "guild_types",
        ];


        $request_forms = request()->all();
        $current_lang = iccima_get_sess_lang();
        $ws_iccima_user_current = request()->session()->get("ws_iccima_user_current", []);
        $current_user_type = request()->session()->get("ws_iccima_user_type", "guest");

        if ($current_user_type != "merchant") {
            return response()->json([
                'data' => [
                    'msg' => "Access denied for Admin !"
                ],
                'req' => request()->all(),
            ], 403);
        }
        $card_no = @$ws_iccima_user_current['card_no'];
        $current_merchant_e_lv = MerchantEUserModel::firstOrCreate(
            ['card_no' => $card_no],
            [
                "last_updated_at" => Pdate::persianTimeStampNow(),
                "confirmed" => 0,
            ]
        );
        $updated_merchant_e_lv = [];
        foreach ($save_indexes as $save_index) {
            $new_val_lang =  (string)@$request_forms[$save_index];
            if (in_array($save_index, $multi_lang_indexed)) {
                $lv_me_json_decode = json_decode(@$current_merchant_e_lv[$save_index]) ? (array)json_decode(@$current_merchant_e_lv[$save_index]) : [];
                $lv_me_json_decode[$current_lang] = $new_val_lang;
                $updated_merchant_e_lv[$save_index] = json_encode($lv_me_json_decode, JSON_UNESCAPED_UNICODE);
            } else {
                $updated_merchant_e_lv[$save_index] = $new_val_lang;
            }
        }
        $bm_path = "";
        if (@$_FILES['brand_file__e']) {
            $file_validation = iccima_upload_validate_image($_FILES['brand_file__e']);
            $response = @$file_validation['response'];
            $msg = @$file_validation['msg'];
            if ($response == "success") {
                $bm_path = iccima_upload_public_src($_FILES['brand_file__e'], "brands");
            } else {
                return response()->json([
                    'data' => [
                        'msg' => $msg
                    ],
                    'req' => request()->all(),
                ], 422);
            }
        }
        $updated_merchant_e_lv["brand_image"] = $bm_path;
        $updated_merchant_e_lv["confirmed"] = 0;
        $updated_merchant_e_lv["last_updated_at"] = Pdate::persianTimeStampNow();
        MerchantEUserModel::updateOrCreate([
            "card_no"   => $card_no,
        ], $updated_merchant_e_lv);

        return response()->json([
            'data' => $updated_merchant_e_lv,
            'files' => $bm_path,
            'req' => request()->all(),
        ], 200);
    }
    public function deleteBrandLogo() {}
}
