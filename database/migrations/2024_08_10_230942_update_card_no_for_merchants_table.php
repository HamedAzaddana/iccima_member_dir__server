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
            $table->string('card_no')->unique(true)->nullable(false)->change();
        });
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->string('card_no')->unique(true)->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchants', function (Blueprint $table) {
            $table->string('card_no')->unique(false)->nullable(true)->change();
        });
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->string('card_no')->unique(false)->nullable(true)->change();
        });
    }
};
