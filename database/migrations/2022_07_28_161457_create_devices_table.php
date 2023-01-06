<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('alias')->nullable();
            $table->string('device_address')->unique();
            $table->integer('type')->default(1);
            $table->string('location')->nullable();
            $table->foreignId('country_id')->nullable();
            $table->foreignId('state_id')->nullable();
            $table->foreignId('city_id')->nullable();
            $table->enum('is_auto', ['Yes', 'No'])->default('No');
            $table->double('low_temperature', 5, 2)->nullable();
            $table->double('high_temperature', 5, 2)->nullable();
            $table->foreignId('user_id');
            $table->enum('status', ['Open', 'Close'])->default('Close');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devices');
    }
}
