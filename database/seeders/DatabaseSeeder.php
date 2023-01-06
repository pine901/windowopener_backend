<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            CountriesTableSeeder::class,
            StatesTableSeeder::class,
            CitiesTableChunkOneSeeder::class,
            CitiesTableChunkTwoSeeder::class,
            CitiesTableChunkThreeSeeder::class,
            CitiesTableChunkFourSeeder::class,
            CitiesTableChunkFiveSeeder::class,
        ]);
    }
}
