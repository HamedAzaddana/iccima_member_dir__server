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
        Schema::table('merchants', function (Blueprint $table) {
            $table->longText('biz_activities')->nullable()->change();
            $table->longText('biz_activitiy_goods')->nullable()->change();
            $table->longText('coo_biz_activities')->nullable()->change();
            $table->longText('biz_act_goods_hs_codes')->nullable()->change();
            $table->longText('shared_chambers')->nullable()->change();
            $table->longText('specialized_committees')->nullable()->change();
            $table->longText('guild_types')->nullable()->change();
        });
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->longText('shared_chambers')->nullable()->change();
            $table->longText('specialized_committees')->nullable()->change();
            $table->longText('guild_types')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchants', function (Blueprint $table) {
            $table->text('biz_activities')->nullable()->change();
            $table->text('biz_activitiy_goods')->nullable()->change();
            $table->text('coo_biz_activities')->nullable()->change();
            $table->text('biz_act_goods_hs_codes')->nullable()->change();
            $table->text('shared_chambers')->nullable()->change();
            $table->text('specialized_committees')->nullable()->change();
            $table->text('guild_types')->nullable()->change();
        });
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->text('shared_chambers')->nullable()->change();
            $table->text('specialized_committees')->nullable()->change();
            $table->text('guild_types')->nullable()->change();
        });
    }
};
