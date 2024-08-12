<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * longText , text
     */
    public function up(): void
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('owner_fullname')->nullable();
            $table->string('card_type_id')->nullable();
            $table->string('person_type_id')->nullable();
            $table->string('group_activity_type')->nullable();
            $table->string('card_no')->nullable();
            $table->string('co_title')->nullable();
            $table->string('co_type')->nullable();
            $table->string('co_establish_date')->nullable();
            $table->longText('co_image')->nullable();
            $table->longText('owner_image')->nullable();
            $table->string('city')->nullable();
            $table->string('co_phone')->nullable();
            $table->string('co_fax')->nullable();
            $table->text('co_website')->nullable();
            $table->text('co_main_address')->nullable();
            $table->text('co_email')->nullable();
            $table->string('postal_code')->nullable();

            $table->text('biz_activities')->nullable();
            $table->text('biz_activitiy_goods')->nullable();
            $table->text('coo_biz_activities')->nullable();
            $table->text('biz_act_goods_hs_codes')->nullable();
            $table->text('shared_chambers')->nullable();
            $table->text('specialized_committees')->nullable();
            $table->text('guild_types')->nullable();
            
            $table->timestamp('last_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};
