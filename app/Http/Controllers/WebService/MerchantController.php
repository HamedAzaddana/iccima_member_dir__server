<?php

namespace App\Http\Controllers\WebService;

use App\Exceptions\ErrorResponse;
use App\Http\Controllers\Controller;
use App\Models\MerchantUser as MerchantUserModel;
use App\Models\Preset as PresetModel;


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
        if($merchant){
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
        // $hid = request("hid");
        $request_forms = request()->all();
 

        //check lang and store values according it !

        return response()->json([
            'data' => ['s'],
            'file' => $_FILES,
            'req' => request()->all(),
        ], 200);
    }
    public function deleteBrandLogo()
    {

    }
}
