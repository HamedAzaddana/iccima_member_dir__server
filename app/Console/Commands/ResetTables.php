<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;

class ResetTables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tables:reset_iccima';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset (truncate) Some tables like jobs !';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::table('jobs')->truncate();
        DB::table('failed_jobs')->truncate();
        DB::table('user_activities')->truncate();
    }
 
}
