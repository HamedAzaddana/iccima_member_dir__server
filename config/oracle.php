<?php


return [
    'oracle' => [
        'driver' => 'oracle',
        'tns' => env('ORACLE_DB_TNS', ''),
        'host' => env('ORACLE_DB_HOST', ''),
        'port' => env('ORACLE_DB_HOST_PORT', '1521'),
        'database' => env('ORACLE_DB_NAME', ''),
        'service_name' => env('ORACLE_DB_SERVICE_NAME', ''),
        'username' => env('ORACLE_DB_USERNAME', ''),
        'password' => env('ORACLE_DB_PASSWORD', ''),
        'charset' => env('ORACLE_DB_ENCODING', 'AL32UTF8'),
        'prefix' => '',
        'prefix_schema' => env('ORACLE_DB_SCHEMA', ''),
        'edition' => env('DB_EDITION', 'ora$base'),
        'server_version' => "33",
        'load_balance' => env('DB_LOAD_BALANCE', 'yes'),
        'max_name_len' => env('ORA_MAX_NAME_LEN', 30000),
        'dynamic' => [],
        'sessionVars' => [
            'NLS_TIME_FORMAT' => 'HH24:MI:SS',
            'NLS_DATE_FORMAT' => 'YYYY-MM-DD HH24:MI:SS',
            'NLS_TIMESTAMP_FORMAT' => 'YYYY-MM-DD HH24:MI:SS',
            'NLS_TIMESTAMP_TZ_FORMAT' => 'YYYY-MM-DD HH24:MI:SS TZH:TZM',
            'NLS_NUMERIC_CHARACTERS' => '.,',
        ],
    ],
];
