<?php


use Illuminate\Support\Facades\Route;

Route::get('/test-make-table-codes', function () {
    $route = "https://cscs.chambertrust.ir:8443/services/rest/cardServiceV3/getCardInfoModelByCardNoByCardTypeV3/10320281775/2";
    $headers = [
        "Content-Type" => "application/json",
        "userName" => "iccima-next",
        "password" => "txIXYr25VYPk",
    ];
    $r = @iccima_request_http([], $route, "GET", $headers)['response_object'];
    $r__keys = array_keys($r);

    $migrate_note = "";
    foreach ($r__keys as $rk) {
        $migrate_note.='$table->string("'.$rk.'")->nullable();'." \n";
    }
    dd(
        json_encode($r__keys),
        $migrate_note,
    );
});

Route::get('/test-els-search-main', function () {

    $client = iccima_els_client();
    $params = [
        'index' => 'iccima_cards_data_merchants',
        "body" => [
            "query" => [
                "bool" => [
                    "must" => [
                        "multi_match" => [
                            'query' => "دارو",
                            'fields' => [
                                'owner_fullname',
                                'co_title',
                                'biz_activities',
                                'biz_activitiy_goods',
                                'coo_biz_activities',
                                'biz_act_goods_hs_codes',
                                'shared_chambers',
                                'specialized_committees',
                                'guild_types',
                            ],
                        ],
                    ],
                    "filter" => [
                        ["match" => ["province" => "تهران"]],
                        ["match" => ["group_activity_type" => "صنعت"]],
                    ],
                ],
            ],
        ],
        "size" => 50,
    ];
    $response = $client->search($params);
    dd(iccima_prepare_get_db_elastic($response->asArray()));
});
Route::get('/test-els-search', function () {
    $client = iccima_els_client();

    $params = [
        'index' => 'sokanacademy_sample_data_2',
        "body" => [
            "query" => [
                "bool" => [
                    "must" => [
                        "multi_match" => [
                            'query' => "کتاب",
                            'fields' => ['title', 'description', 'body'],
                        ],
                    ],
                    "filter" => [
                        // [
                        //     'match' => [
                        //         'title' => [
                        //             "query" => 'سرمایه GSAP',
                        //             "operator" => "or",
                        //         ]
                        //     ]
                        // ],
                        // ["match" => ["title" => "سرمایه"]],
                    ],
                ],
            ],
        ],

        "size" => 30,
    ];

    $response = $client->search($params);
    dd($response->asArray());
    // dd(iccima_prepare_get_db_elastic($response->asArray()));

    // $response = $client->info();
    // echo $response->getStatusCode();
    // echo (string) $response->getBody();
    // dd();
});
Route::get('/test-pdo-oci', function () {
    $host = env("ORACLE_DB_HOST", "");
    $dbname = env("ORACLE_DB_NAME", "");
    $port = env("ORACLE_DB_HOST_PORT", "");
    $service = env("ORACLE_DB_SERVICE_NAME", "");
    $user = env("ORACLE_DB_USERNAME", "");
    $pass = env("ORACLE_DB_PASSWORD", "");
    $tns = env("ORACLE_DB_TNS", "");

    $db_username = $user;
    $db_password = $pass;
    $db = "oci:dbname=$tns";
    $conn = new PDO($db, $db_username, $db_password);
    $stmt = $conn->prepare('SELECT * FROM ICCIM.TEMP_POWER_BI_VIEW');
    $stmt->execute();
});
Route::get('/test-oci', function () {
    $start = microtime(true);


    $username = 'BI_User';
    $password = 'RkE5gZUK0fm3hyBZpVdj';
    $connection_string = '172.16.0.58:1521/smartdb';

    $conn = oci_pconnect($username, $password, $connection_string, "AL32UTF8");

    if (!$conn) {
        $error = oci_error();
        echo "Oracle connection error: " . $error['message'];
        exit;
    }

    echo "Connected to Oracle!";

    $stid = oci_parse($conn, 'SELECT * FROM ICCIM.TEMP_POWER_BI_VIEW WHERE ROWNUM <= 1000');
    oci_execute($stid);

    echo "<pre>\n";
    while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
        echo var_dump($row) . "<br>";
    }
    echo "</pre>\n";

    oci_free_statement($stid);
    oci_close($conn);

    $end = microtime(true);
    $elapsed = $end - $start;

    echo "Script executed in $elapsed seconds";
});
