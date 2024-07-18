<?php

namespace App\Observers;

use App\Models\CardsData;
use App\Jobs\IndexCardDataElasticsearchJob;
use App\Jobs\RemoveCardDataElasticsearchJob;

class CardsDataObserver
{
 
    public function created(CardsData $card_data)
    {
        $card_data = CardsData::prepare_save_db_elastic((array)$card_data);
        dispatch(new IndexCardDataElasticsearchJob($card_data));
    }

 
    public function updated(CardsData $card_data)
    {
        $card_data = CardsData::prepare_save_db_elastic((array)$card_data);
        dispatch(new IndexCardDataElasticsearchJob($card_data));
    }

  
    public function deleted(CardsData $card_data)
    {
        $card_data = (array)$card_data;
        dispatch(new RemoveCardDataElasticsearchJob($card_data['id']));
    }
}