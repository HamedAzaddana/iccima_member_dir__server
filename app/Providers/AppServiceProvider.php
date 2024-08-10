<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
// use App\Models\CardsData;
// use App\Observers\CardsDataObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('ENVIRONMENT_APP') !== 'development') {
            URL::forceScheme('https');
        }
        // CardsData::observe(CardsDataObserver::class);
    }
}
