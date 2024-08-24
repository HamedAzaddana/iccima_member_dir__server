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
            $table->text('brand_title')->nullable()->change();
            $table->tinyInteger('confirmed')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->string('brand_title')->nullable()->change();
            $table->tinyInteger('confirmed')->nullable()->change();
        });
    }
};
