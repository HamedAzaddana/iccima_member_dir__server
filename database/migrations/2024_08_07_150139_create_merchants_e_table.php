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
        Schema::create('merchants_e', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('shared_chambers')->nullable();
            $table->text('specialized_committees')->nullable();
            $table->text('guild_types')->nullable();
            $table->string('card_no')->nullable();
            $table->timestamp('last_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants_e');
    }
};
