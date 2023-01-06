<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'country_id',
        'country_code',
        'fips_code',
        'iso2',
        'latitude',
        'longitude',
        'flag',
        'wikiDataId',
    ];
}
