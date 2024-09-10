<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

    protected $commands = [
        Commands\ResetTables::class,
        Commands\SyncDataIndex::class,
        Commands\MakeAdminUser::class,
        Commands\GetDataIndex::class,
    ];
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('cleanup:inactive-users')->everyFiveMinutes();
        $schedule->command('tables:reset_iccima')
            ->dailyAt('1:00');
        $schedule->command('index_data_cards:sync')
            ->everyTenSeconds();
        $schedule->command('get_index_cards:sync')
            ->dailyAt('2:00');

        //iqqoox09
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
