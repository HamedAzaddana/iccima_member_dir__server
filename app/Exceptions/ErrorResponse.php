<?php

namespace App\Exceptions;



class ErrorResponse 
{

    public static function error_429_api($msg)
    {
        return response()->json([
            'msg' => "$msg",
        ], 429);
    }
    public static function error_404_api($msg)
    {
        return response()->json([
            'msg' => "$msg",
        ], 404);
    }
    public static function error_403_api($msg)
    {
        if (iccima_get_current_user_id()) {
            return response()->json([
                'msg' => "$msg",
            ], 403);
        } else {
            return response()->json([
                'msg' => "You are not authenticated !",
            ], 401);
        }
    }
}
