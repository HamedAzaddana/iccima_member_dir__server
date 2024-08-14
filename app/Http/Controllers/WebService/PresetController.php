<?php

namespace App\Http\Controllers\WebService;

use App\Http\Controllers\Controller;
use App\Models\Preset as PresetModel;


class PresetController extends Controller
{

    public function get_filters_var()
    {
        request()->session()->put('params_filter_user', []);
        $presets = PresetModel::select('value', 'title', 'type')
            ->get()->toArray();
        $province = [];
        foreach ($presets as $preset) {
            $_type = $preset['type'];
            switch ($_type) {
                case "province":
                    $province[$preset['value']] = $preset['title'];
                    break;
                default:
                    //Do Nothing !
            }
        }
        return response()->json([
            'data' => [
                'provinces' => iccima_prepareSelect($province),
            ],
        ], 200);
    }
}
