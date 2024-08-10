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
        Schema::create('api_data_indexes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('index_number');
            $table->tinyInteger('status');
            $table->timestamp('last_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_data_indexes');
    }
};
