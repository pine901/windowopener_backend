<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;
use App\Models\DeviceLog;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserLog;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function get(Request $request) {
        $users = User::all();
        return response()->json(['data' => $users->makeVisible(['role'])]);
    }

    public function create(Request $request) {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        $user->email_verified_at = now();
        $user->save();
        return response()->json(['data' => $user->makeVisible(['role'])]);
    }

    public function delete($id) {
        User::destroy($id);
        UserLog::where('user_id', $id)->delete();
        Device::where('user_id', $id)->delete();
        DeviceLog::where('user_id', $id)->delete();
        return response()->json(['data' => $id]);
    }
}
