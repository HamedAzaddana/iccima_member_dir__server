<?php

function iccima_prepareSelect($arr)
{
    $output = [];
    foreach ($arr as $k => $v) {
        $element =[];
        $element['value'] = $k;
        $element['label'] = $v;
        $output[]=$element;
    }
    return $output;
}
function iccima_arabicToPers_conv($string)
{
    $arabic = array('ي', 'ك', 'ة');
    $farsi = array('ی', 'ک', 'ه');
    return str_replace($arabic, $farsi, $string);
}
function iccima_array_map_assoc(callable $callback, array $array, array ...$arrays) {
	$keys = array_keys($array);
	array_unshift($arrays, $keys, $array);
	return array_combine($keys, array_map($callback, ...$arrays));
}