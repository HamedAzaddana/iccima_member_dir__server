<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cards_data_merchants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('mv_member_directory_id')->nullable();
            $table->text('bizactivities_en')->nullable();
            $table->text('bizactivities_fa')->nullable();
            $table->string('card_no')->nullable();
            $table->string('companyname_en')->nullable();
            $table->string('companyname_fa')->nullable();
            $table->string('corporationestablishdate_en')->nullable();
            $table->string('corporationestablishdate_fa')->nullable();
            $table->string('email')->nullable();
            $table->string('gregorian_expire_date')->nullable();
            $table->text('guild_types')->nullable();
            $table->string('jalaly_expire_date')->nullable();
            $table->string('mainaddress_en')->nullable();
            $table->string('mainaddress_fa')->nullable();
            $table->string('mobile_no')->nullable();
            $table->string('ownerfirstname_en')->nullable();
            $table->string('ownerfirstname_fa')->nullable();
            $table->string('ownerlastname_en')->nullable();
            $table->string('ownerlastname_fa')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('root_id')->nullable();
            $table->text('shared_chambers')->nullable();
            $table->string('sort_factor')->nullable();
            $table->text('specialized_committees')->nullable();
            $table->string('website')->nullable();
            $table->string('card_type_id')->nullable();
            $table->string('city_id')->nullable();
            $table->string('corporation_country_id')->nullable();
            $table->string('corporation_logo_id')->nullable();
            $table->string('corporation_nationality_id')->nullable();
            $table->string('corporation_type_id')->nullable();
            $table->string('organization_branch_id')->nullable();
            $table->string('owner_country_id')->nullable();
            $table->string('owner_image_id')->nullable();
            $table->string('owner_nationality_id')->nullable();
            $table->string('person_type_id')->nullable();
            $table->string('province_id')->nullable();
            $table->string('rating_type_id')->nullable();
            $table->string('request_info_id')->nullable();
            $table->string('status')->nullable();
            $table->string('trade_card_id')->nullable();
            $table->text('specializedcommittees_en')->nullable();
            $table->text('specializedcommittees_fa')->nullable();
            $table->string('updatedatetime')->nullable();
            $table->string('fax_no')->nullable();
            $table->string('mobile_no_main')->nullable();
            $table->string('biz_activities_ids')->nullable();
            $table->string('export_dollor_price')->nullable();
            $table->string('import_dollor_price')->nullable();
            $table->string('isicact_roots_id')->nullable();
            $table->text('isicactroots_en')->nullable();
            $table->text('isicactroots_fa')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('turnover_amount')->nullable();
            $table->string('rownumber')->nullable();
            $table->string('is_marked_as_delete')->nullable();
            $table->timestamp('last_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards_data_merchants');
    }
};
