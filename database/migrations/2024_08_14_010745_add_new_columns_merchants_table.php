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
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->tinyInteger('confirmed')->after('card_no');
        });
        Schema::table('merchants', function (Blueprint $table) {
            $table->string('province')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->dropColumn('confirmed');
        });
        Schema::table('merchants', function (Blueprint $table) {
            $table->dropColumn('province');
        });
    }
};
