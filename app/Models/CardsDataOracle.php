<?php

namespace App\Models;

use Yajra\Oci8\Eloquent\OracleEloquent as Eloquent;

class CardsDataOracle extends Eloquent
{
     protected $connection = 'oracle';
     
     protected $binaries = [];
     protected $table = "CARD_FIN_COMMITMENT_VIEW";
     public $sequence = null;


}
