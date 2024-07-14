<?php

namespace App\Models;

use Yajra\Oci8\Eloquent\OracleEloquent as Eloquent;

class CardsDataOracle extends Eloquent
{
     protected $connection = 'oracle';
     
     protected $binaries = [];
     protected $table = "MV_MEMBER_DIRECTORY";
     public $sequence = null;


}
