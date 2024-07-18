<?php

namespace App\Jobs;

use Elasticsearch\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RemoveCardDataElsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $card_data_id;

    public function __construct($card_data_id)
    {
        $this->card_data_id = $card_data_id;
    }

    public function handle()
    {
        $client = iccima_els_client();
        $params = [
            'index' => 'iccima_cards_data_merchants',
            'id' => $this->card_data_id,
        ];

        try {
            $client->delete($params);
        } catch (\Exception $exception) {
            // Already deleted..
        }
    }
}