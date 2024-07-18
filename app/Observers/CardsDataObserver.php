<?php

namespace App\Observers;

use App\Models\CardsData;
use App\Jobs\IndexCardDataElsJob;
use App\Jobs\RemoveCardDataElsJob;

class CardsDataObserver
{
 
    public function created(CardsData $card_data)
    {
        $data = $card_data->toArray();
        $data = CardsData::prepare_save_db_elastic($data);
        dispatch(new IndexCardDataElsJob($card_data));
    }

 
    public function updated(CardsData $card_data)
    {
        $data = $card_data->toArray();
        $data = CardsData::prepare_save_db_elastic($data);
        dispatch(new IndexCardDataElsJob($card_data));
    }

  
    public function deleted(CardsData $card_data)
    {
        $data = $card_data->toArray();
        $data = CardsData::prepare_save_db_elastic($data);
        dispatch(new RemoveCardDataElsJob($data['id']));
    }
}