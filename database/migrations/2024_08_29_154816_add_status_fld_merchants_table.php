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
            $table->tinyInteger('show_in_index')->default(1)->after('guild_types');
            $table->bigInteger('view_count')->default(1)->after('guild_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchants', function (Blueprint $table) {
            $table->dropColumn('show_in_index');
            $table->dropColumn('view_count');
        });
    }
};
