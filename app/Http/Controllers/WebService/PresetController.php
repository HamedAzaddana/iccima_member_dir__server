<?php

namespace App\Http\Controllers\WebService;

use App\Http\Controllers\Controller;
use App\Models\Preset as PresetModel;


class PresetController extends Controller
{

    public function get_filters_var()
    {
        $lang = iccima_get_sess_lang();
        iccima_session_put('params_filter_user', []);
        $presets = PresetModel::select('value', 'title', 'type')
            ->get()->toArray();
        $province = [];
        $en_province = [];
        $activity_str_search = [];
        foreach ($presets as $preset) {
            $_type = $preset['type'];
            switch ($_type) {
                case "province":
                    $province[$preset['value']] = $preset['title'];
                    break;
                case "en_province":
                    $en_province[$preset['value']] = $preset['title'];
                    break;
                case "activity_str_search":
                    $activity_str_search[$preset['value']] = $preset['title'];
                    break;
                default:
                    //Do Nothing !
            }
        }
        if ($lang != "Persian") {
            $province = $en_province;
        }
        return response()->json([
            'data' => [
                'provinces' => iccima_prepareSelect($province),
                'activity_str_search' => iccima_prepareSelect($activity_str_search),
            ],
        ], 200);
    }
}
