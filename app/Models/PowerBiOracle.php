<?php

namespace App\Models;

use Yajra\Oci8\Eloquent\OracleEloquent as Eloquent;

class PowerBiOracle extends Eloquent
{
     protected $connection = 'oracle';
     
     protected $binaries = [];
     protected $table = "TEMP_POWER_BI_VIEW";
     public $sequence = null;


}
