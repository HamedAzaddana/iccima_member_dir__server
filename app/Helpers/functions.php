<?php

function prepareSelect($arr)
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