<?php

namespace App\Helpers;

use App\Helpers\Pdate;

class Logger
{
    public static function LogOracleConnection($success = true, $msg = "", $data = [])
    {
        $log_file = base_path()."/storage/logs/orc-sync.log";
        if (!file_exists($log_file)) {
            $fp = fopen($log_file, "w");
            fwrite($fp, "");
            fclose($fp);
            chmod($log_file, 0777);
        }
        $datetime = (string)Pdate::persianTimeStampNow();
        $data_strigified = print_r($data, true);
        $append_txt = "[$datetime]\n[$msg]\n[$data_strigified]\n ********* ";
        file_put_contents($log_file, $append_txt . PHP_EOL, FILE_APPEND | LOCK_EX);
    }
    public static function LogCustom($data)
    {
        $log_file = base_path()."/storage/logs/custom.log";
        if (!file_exists($log_file)) {
            $fp = fopen($log_file, "w");
            fwrite($fp, "");
            fclose($fp);
            chmod($log_file, 0777);
        }
        $datetime = (string)Pdate::persianTimeStampNow();
        $data_strigified = print_r($data, true);
        $append_txt = "[$datetime]\n[$data_strigified]\n ********* \n";
        file_put_contents($log_file, $append_txt . PHP_EOL, FILE_APPEND | LOCK_EX);
    }
}
