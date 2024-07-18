<?php

namespace App\Jobs;

use Elasticsearch\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class IndexCardDataElasticsearchJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $card_data;

    public function __construct($card_data)
    {
        $this->card_data = $card_data;
    }

    /**
     * Execute the job.
     * @param Client $client
     */
    public function handle()
    {
        $client = iccima_els_client();
        $card_data = $this->card_data;
        $_id = $card_data['id'];
        unset($card_data['id']);
        $params = [
            'index' => 'iccima_cards_data_merchants',
            'id' => $_id,
            'body' => $card_data
        ];

        $client->index($params);
    }
}