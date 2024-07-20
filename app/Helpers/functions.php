<?php

use App\Models\CardsData;
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
    return CardsData::get_els_client();
}
function iccima_prepare_get_db_elastic($data)
{
    return CardsData::prepare_get_db_elastic($data);
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