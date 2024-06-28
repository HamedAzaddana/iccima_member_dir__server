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
        Schema::create('merchant_corporation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('logo_corp')->nullable();
            $table->text('user_image')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('corp_name')->nullable();
            $table->string('year_created')->nullable();
            $table->string('province')->nullable()->index('province');
            $table->string('city')->nullable();
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->text('website')->nullable();
            $table->text('activity')->nullable()->index('activity');
            $table->string('activity_type')->nullable()->index('activity_type');
            $table->longText('orders_registered')->nullable();
            $table->longText('imports_done')->nullable();
            $table->longText('certificate_issued')->nullable();
            $table->longText('common_rooms')->nullable();
            $table->longText('spec_commissions')->nullable();
            $table->longText('organizations')->nullable();
            $table->string('person_type')->nullable();
            $table->string('hs_code')->nullable();
            $table->text('products')->nullable();
            $table->string('rank')->nullable()->index('rank');
            $table->timestamp('last_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_corporation');
    }
};
