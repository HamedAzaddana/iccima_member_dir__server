<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\MerchantUser;
use App\Helpers\Logger;

class SyncDataIndex extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'index_data_cards:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync data from Index Table database !';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $data = MerchantUser::sync_data_indexes();
            Logger::LogOracleConnection(true,"Success !",$data);
        } catch (\Exception $e) {
            $msg = "Error : " . $e->getMessage();
            Logger::LogOracleConnection(false,$msg);
        }
    }
}
