<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserLog;

class UserLogController extends Controller
{
    public function get()
    {
        $logs = UserLog::with(['user'])->orderBy('created_at', 'DESC')->get();
        return response()->json(['data' => $logs]);
    }
}
