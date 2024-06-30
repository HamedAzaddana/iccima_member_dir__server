<?php

namespace App\Helpers;

class IccString
{
    public static function isIccDateYmd($s)
    {
        if (preg_match('/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/', $s)) {
            return true;
        } else {
            return false;
        }
    }
    public static function displayTextWithLinks($s)
    {
        return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a style="text-align: center;width: 200px;display: block;border: 1px solid #395d86;padding: 6px;margin: 6px;margin-right: 20%;background: #395d86;color: white;text-decoration: none;border-radius: 5px;" dir="ltr" href="$1">مشاهده &#8599; </a>', $s);
    }
    public static function strequalfa($s1, $s2)
    {
        return self::charchangefa(trim($s1)) == self::charchangefa(trim($s2));
    }
    public static  function charchangefa($string)
    {
        $string = str_replace("ك", 'ک', $string);
        $string = str_replace("ي", 'ی', $string);
        return ($string);
    }
    public static  function r_charchangefa($string)
    {
        $string = str_replace("ک", 'ك', $string);
        $string = str_replace("ی", 'ي', $string);
        return ($string);
    }
    public static function checkMeliCode($code)
    {

        if (!preg_match('/^[0-9]{10}$/', $code))
            return false;
        for ($i = 0; $i < 10; $i++)
            if (preg_match('/^' . $i . '{10}$/', $code))
                return false;
        for ($i = 0, $sum = 0; $i < 9; $i++)
            $sum += ((10 - $i) * intval(substr($code, $i, 1)));
        $ret = $sum % 11;
        $parity = intval(substr($code, 9, 1));
        if (($ret < 2 && $ret == $parity) || ($ret >= 2 && $ret == 11 - $parity))
            return true;
        return false;
    }
    public static function is_serialized($data, $strict = true)
    {
        // If it isn't a string, it isn't serialized.
        if (!is_string($data)) {
            return false;
        }
        $data = trim($data);
        if ('N;' === $data) {
            return true;
        }
        if (strlen($data) < 4) {
            return false;
        }
        if (':' !== $data[1]) {
            return false;
        }
        if ($strict) {
            $lastc = substr($data, -1);
            if (';' !== $lastc && '}' !== $lastc) {
                return false;
            }
        } else {
            $semicolon = strpos($data, ';');
            $brace     = strpos($data, '}');
            // Either ; or } must exist.
            if (false === $semicolon && false === $brace) {
                return false;
            }
            // But neither must be in the first X characters.
            if (false !== $semicolon && $semicolon < 3) {
                return false;
            }
            if (false !== $brace && $brace < 4) {
                return false;
            }
        }
        $token = $data[0];
        switch ($token) {
            case 's':
                if ($strict) {
                    if ('"' !== substr($data, -2, 1)) {
                        return false;
                    }
                } elseif (false === strpos($data, '"')) {
                    return false;
                }
                // Or else fall through.
            case 'a':
            case 'O':
                return (bool) preg_match("/^{$token}:[0-9]+:/s", $data);
            case 'b':
            case 'i':
            case 'd':
                $end = $strict ? '$' : '';
                return (bool) preg_match("/^{$token}:[0-9.E+-]+;$end/", $data);
        }
        return false;
    }
    public static function makeRandomHash($items = 1, $length = 1)
    {
        $rndInit = mt_rand(3, 6);
        $code = $rndInit;
        for ($c = 1; $c <= $items; $c++) {
            $rnd = bin2hex(random_bytes($length));
            $code .= $rnd . "-";
        }
        $rndNum = mt_rand(3, 6);
        $now = (time());
        $code .= $rndNum;
        $hash = base64_encode($code);
        $hash = str_replace('=', '', $hash) . "-" . $now;
        return $hash;
    }
    public static function make_en($str)
    {
        $replace_pairs = array(
            '۰' => '0', '۱' => '1', '۲' => '2', '۳' => '3', '۴' => '4', '۵' => '5', '۶' => '6', '۷' => '7', '۸' => '8', '۹' => '9',
            '٠' => '0', '١' => '1', '٢' => '2', '٣' => '3', '٤' => '4', '٥' => '5', '٦' => '6', '٧' => '7', '٨' => '8', '٩' => '9'
        );
        return strtr($str, $replace_pairs);
    }
    public static function make_fa($str)
    {
        $replace_pairs = array_flip(array(
            '۰' => '0', '۱' => '1', '۲' => '2', '۳' => '3', '۴' => '4', '۵' => '5', '۶' => '6', '۷' => '7', '۸' => '8', '۹' => '9',
            '٠' => '0', '١' => '1', '٢' => '2', '٣' => '3', '٤' => '4', '٥' => '5', '٦' => '6', '٧' => '7', '٨' => '8', '٩' => '9'
        ));
        return strtr($str, $replace_pairs);
    }
    public static function is_birth_date_format($s)
    {
        if (preg_match('/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/i', $s)) {
            return true;
        } else {
            return false;
        }
    }
   
}
