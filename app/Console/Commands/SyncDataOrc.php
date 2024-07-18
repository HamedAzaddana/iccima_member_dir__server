<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\CardsData;
use App\Helpers\Logger;

class SyncDataOrc extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'oracle_data:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync data from oracle database !';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $data = CardsData::sync_data_oracle();
            Logger::LogOracleConnection(true,"Success !",$data);
        } catch (\Exception $e) {
            $msg = "Error : " . $e->getMessage();
            Logger::LogOracleConnection(false,$msg);
        }
    }
}
