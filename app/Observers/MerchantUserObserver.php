<?php

namespace App\Observers;

use App\Models\MerchantUser;
use App\Jobs\IndexCardDataElsJob;
use App\Jobs\RemoveCardDataElsJob;

class MerchantUserObserver
{

    public function created(MerchantUser $card_data)
    {
        $data = $card_data->toArray();
        $data = MerchantUser::prepare_save_db_elastic($data);
        iccima_log_custom("created : " . $data['card_no']);
        dispatch(new IndexCardDataElsJob($data));
    }


    public function updated(MerchantUser $card_data)
    {
        $data = $card_data->toArray();
        $data = MerchantUser::prepare_save_db_elastic($data);
        iccima_log_custom("updated : " . $data['card_no']);
        dispatch(new IndexCardDataElsJob($data));
    }


    public function deleted(MerchantUser $card_data)
    {
        $data = $card_data->toArray();
        $data = MerchantUser::prepare_save_db_elastic($data);
        dispatch(new RemoveCardDataElsJob($data['id']));
    }
}
