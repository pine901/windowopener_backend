<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;
use App\Models\DeviceLog;
use Illuminate\Support\Facades\Log;

class DeviceController extends Controller
{
    public function get(Request $request) {
        $devices = Device::all();
        return response()->json(['data' => $devices]);
    }

    public function getDevices(Request $request) {
        $devices = Device::where('user_id', $request->user()->id)->get();
        return response()->json(['data' => $devices->makeHidden(['created_at', 'updated_at', 'type', 'creator', 'user_id', 'location', 'country_id', 'state_id', 'city_id'])]);
    }

    public function getDeviceByApp($id) {
        $device = Device::find($id);
        return response()->json(['data' => $device->makeHidden(['created_at', 'updated_at', 'type', 'creator', 'user_id', 'location', 'country_id', 'state_id', 'city_id'])]);
    }

    public function create(Request $request) {
        $request->validate([
            'device_address' => ['required', 'string', 'max:255', 'unique:devices'],
        ]);

        $device = new Device();
        if($request->has('alias'))
            $device->alias = $request->alias;
        $device->device_address = $request->device_address;
        if($request->has('type'))
            $device->type = $request->type;
        if($request->has('location'))
            $device->location = $request->location;
        $device->is_auto = $request->is_auto;
        if($request->has('low_temperature'))
            $device->low_temperature = $request->low_temperature;
        if($request->has('high_temperature'))
            $device->high_temperature = $request->high_temperature;
        $device->user_id = $request->user()->id;
        $device->status = 'Open';
        $device->save();
        return response()->json(['data' => $device]);
    }

    public function createByApp(Request $request)
    {
        Log::info($request);
        $request->validate([
            'device_address' => ['required', 'string', 'max:255', 'unique:devices'],
        ]);

        $device = new Device();
        if($request->has('alias'))
            $device->alias = $request->alias;
        $device->device_address = $request->device_address;
        if($request->has('is_auto'))
            $device->is_auto = $request->is_auto;
        if($request->has('country'))
            $device->country_id = $request->country["id"];
        if($request->has('state'))
            $device->state_id = $request->state["id"];
        if($request->has('city') && isset($request->city["id"]))
            $device->city_id = $request->city["id"];
        if($request->has('low_temperature'))
            $device->low_temperature = $request->low_temperature;
        if($request->has('high_temperature'))
            $device->high_temperature = $request->high_temperature;
        $device->user_id = $request->user()->id;
        if($request->has('status'))
            $device->status = $request->status;
        $device->save();

        $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"auto\":1,\"low_temp\":' . $device->low_temperature . ',\"high_temp\":' . $device->high_temperature . '}"';
        if($device->is_auto == 'No')
            $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"auto\":0,\"low_temp\":' . $device->low_temperature . ',\"high_temp\":' . $device->high_temperature . '}"';
        Log::info("Run this command: " . $cmd);
        shell_exec($cmd);

        $device = Device::find($device->id);
        return response()->json(['data' => $device->makeHidden(['created_at', 'updated_at', 'type', 'creator', 'user_id', 'location', 'country_id', 'state_id', 'city_id'])]);
    }

    public function updateDeviceByApp(Request $request, $id)
    {
        $device = Device::find($id);
        if($request->has('alias'))
            $device->alias = $request->alias;
        if($request->has('country'))
            $device->country_id = $request->country["id"];
        if($request->has('state'))
            $device->state_id = $request->state["id"];
        if($request->has('city') && isset($request->city["id"]))
            $device->city_id = $request->city["id"];
        if($request->has('low_temperature'))
            $device->low_temperature = $request->low_temperature;
        if($request->has('high_temperature'))
            $device->high_temperature = $request->high_temperature;
        if($request->has('is_auto'))
            $device->is_auto = $request->is_auto;
        $device->save();

        $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"auto\":1,\"low_temp\":' . $device->low_temperature . ',\"high_temp\":' . $device->high_temperature . '}"';
        if($device->is_auto == 'No')
            $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"auto\":0,\"low_temp\":' . $device->low_temperature . ',\"high_temp\":' . $device->high_temperature . '}"';
        Log::info("Run this command: " . $cmd);
        shell_exec($cmd);

        $device = Device::find($id);
        return response()->json(['data' => $device->makeHidden(['created_at', 'updated_at', 'type', 'creator', 'user_id', 'location', 'country_id', 'state_id', 'city_id'])]);
    }

    public function setAutoMode(Request $request, $id)
    {
        $request->validate([
            'value' => ['required', 'in:Yes,No'],
        ]);

        $device = Device::find($id);
        $device->is_auto = $request->value;
        $device->save();

        $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"auto\":1,\"low_temp\":' . $device->low_temperature . ',\"high_temp\":' . $device->high_temperature . '}"';
        if($device->is_auto == 'No')
            $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"auto\":0,\"low_temp\":' . $device->low_temperature . ',\"high_temp\":' . $device->high_temperature . '}"';
        Log::info("Run this command: " . $cmd);
        shell_exec($cmd);

        return response()->json(['data' => $device->makeHidden(['created_at', 'updated_at', 'type', 'creator', 'user_id', 'location', 'country_id', 'state_id', 'city_id'])]);
    }

    public function setOpenStatus(Request $request, $id)
    {
        $request->validate([
            'value' => ['required', 'in:Open,Close'],
        ]);

        $device = Device::find($id);
        $device->status = $request->value;
        $device->save();

        $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"cmd\":1}"';
        if($device->status == 'Close')
            $cmd = 'mosquitto_pub -t /node/0/' . $device->device_address . ' -m "{\"id\":\"' . $device->device_address . '\",\"cmd\":0}"';
        Log::info("Run this command: " . $cmd);
        shell_exec($cmd);

        return response()->json(['data' => $device->makeHidden(['created_at', 'updated_at', 'type', 'creator', 'user_id', 'location', 'country_id', 'state_id', 'city_id'])]);
    }

    public function delete($id) {
        Device::destroy($id);
        DeviceLog::where('device_id', $id)->delete();
        return response()->json(['data' => $id]);
    }
}
