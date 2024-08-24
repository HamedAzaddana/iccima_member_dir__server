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
            $form_vals = $merchant?->editable_form_vals();
        }
        if (!$merchant || !$merchant_id || !$hid) {
            return ErrorResponse::error_404_api("Not Found Resource Merchant !");
        }
        $merchant = $merchant->toArray();
        $merchant['__id'] = $hid;
        $merchant['__forms'] = $form_vals;
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
        
        $request_forms = request()->all();
        $ws_iccima_user_current = request()->session()->get("ws_iccima_user_current", []);
        $current_user_type = request()->session()->get("ws_iccima_user_type", "guest");
        $card_no = @$ws_iccima_user_current['card_no'];
        $merchant_model = MerchantUserModel::where('card_no',$card_no)->first();
        $edited = $merchant_model->editable_form_vals_save($request_forms,$card_no,@$_FILES['brand_file']);

        return response()->json([
            'data' => $edited['data'],
            'req' => request()->all(),
        ], $edited['status_code']);
    }
    public function deleteBrandLogo() {}
}
