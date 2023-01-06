<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Http\Request;

class GeoController extends Controller
{
    public function getCountries() {
        $countries = Country::select('id', 'emoji', 'name')->get();
        return response()->json(['data' => $countries]);
    }

    public function getStates(Request $request) {
        $request->validate([
            'countryId' => ['required', 'integer']
        ]);
        $states = State::where('country_id', $request->countryId)->select('id', 'name')->get();
        return response()->json(['data' => $states]);
    }

    public function getCities(Request $request) {
        $request->validate([
            'stateId' => ['required', 'integer']
        ]);
        $cities = City::where('state_id', $request->stateId)->select('id', 'name')->get();
        return response()->json(['data' => $cities]);
    }

    public function getLatLngByCity($id) {
        $city = City::find($id);
        return response()->json(['data' => $city]);
    }

    public function getLatLngByState($id) {
        $state = State::find($id);
        return response()->json(['data' => $state]);
    }
}
