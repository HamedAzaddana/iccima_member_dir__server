<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\MerchantUser;
use App\Helpers\Logger;

class GetDataIndex extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get_index_cards:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get last index cards for database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $data = MerchantUser::sync_get_indexes();
            Logger::LogOracleConnection(true,"Success !",$data);
        } catch (\Exception $e) {
            $msg = "Error : " . $e->getMessage();
            Logger::LogOracleConnection(false,$msg);
        }
    }
}
