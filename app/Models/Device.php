<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'alias',
        'device_address',
        'type',
        'location',
        'country_id',
        'state_id',
        'city_id',
        'is_auto',
        'low_temperature',
        'high_temperature',
        'user_id',
        'status'
    ];

    protected $appends = ['creator', 'country', 'state', 'city'];

    public function getCreatorAttribute() {
        $user = User::find($this->user_id);
        return $user->name;
    }

    public function getCountryAttribute() {
        $country = Country::select('id', 'name')->find($this->country_id);
        return $country;
    }

    public function getStateAttribute() {
        $state = State::select('id', 'name')->find($this->state_id);
        return $state;
    }

    public function getCityAttribute() {
        $city = City::select('id', 'name')->find($this->city_id);
        return $city;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
