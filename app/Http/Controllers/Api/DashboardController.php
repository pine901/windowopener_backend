<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DeviceLog;
use App\Models\User;
use App\Models\Device;

class DashboardController extends Controller
{
    public function get()
    {
        $logs = DeviceLog::orderBy('timestamp', 'DESC')->limit(10)->get();
        $user_count = User::count();
        $device_count = Device::count();
        return response()->json(['data' => ['logs' => $logs, 'device' => $device_count, 'user' => $user_count]]);
    }
}
