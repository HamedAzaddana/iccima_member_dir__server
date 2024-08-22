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
            $table->string('brand_title')->nullable()->after('guild_types');
            $table->longText('brand_image')->nullable()->after('guild_types');
            $table->text('co_main_address')->nullable()->after('guild_types');
            $table->string('co_phone')->nullable()->after('guild_types');
            $table->string('co_fax')->nullable()->after('guild_types');
            $table->text('co_website')->nullable()->after('guild_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchants_e', function (Blueprint $table) {
            $table->dropColumn('brand_title');
            $table->dropColumn('brand_image');
            $table->dropColumn('co_main_address');
            $table->dropColumn('co_phone');
            $table->dropColumn('co_fax');
            $table->dropColumn('co_website');
        });
    }
};
