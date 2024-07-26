<?php

namespace App\Http\Controllers\WebService;

use App\Http\Controllers\Controller;
use App\Models\MerchantCorp as MerchantCorpModel;
use App\Models\CardsData as CardsDataModel;
use App\Models\Preset as PresetModel;
use App\Helpers\Pdate;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
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
        $params['loaded_cnt'] = $now_loading;
        request()->session()->put('params_filter_user', $params);
       
        $records_load = CardsDataModel::get_data_els_filter($params,$now_loading);

        // dd($records_load);

        // kws : کلمه کلیدی
        // activity_type : نوع فعالیت آیدی آرایه
        // corp_name : نام شرکت
        // first_name
        // last_name
        // hs_code : کد HS
        // person_type :  نوع شخص آیدی
        // product_name : نام کالا
        // province :  استان آیدی
        // rank : رتبه آیدی

        return response()->json([
            'data' => $records_load,
            'req' => $params,
        ], 200);
    }
    public function get_filters_var()
    {
        request()->session()->put('params_filter_user', []);
        $presets = PresetModel::select('value', 'title', 'type')
            ->get()->toArray();
        $person_types = [];
        $province = [];
        $rank = [];
        $activity_type = [];
        foreach ($presets as $preset) {
            $_type = $preset['type'];
            switch ($_type) {
                case "person_type":
                    $person_types[$preset['value']] = $preset['title'];
                    break;
                case "province":
                    $province[$preset['value']] = $preset['title'];
                    break;
                case "rank":
                    $rank[$preset['value']] = $preset['title'];
                    break;
                case "activity_type":
                    $activity_type[$preset['value']] = $preset['title'];
                    break;
                default:
                    //Do Nothing !
            }
        }

        return response()->json([
            'data' => [
                'person_types' => iccima_prepareSelect($person_types),
                'provinces' => iccima_prepareSelect($province),
                'ranks' => iccima_prepareSelect($rank),
                'activity_types' => iccima_prepareSelect($activity_type),
            ],
        ], 200);
    }

}
