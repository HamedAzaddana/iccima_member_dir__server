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
