<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'device_id',
        'status',
        'method',
        'temperature',
        'timestamp',
    ];

    protected $appends = ['alias', 'device_address', 'status_label', 'content'];

    public function getDeviceAddressAttribute() {
        $device = Device::find($this->device_id);
        return $device->device_address;
    }

    public function getAliasAttribute() {
        $device = Device::find($this->device_id);
        return $device->alias;
    }

    public function getStatusLabelAttribute() {
        return $this->status . ' at ' . date('Y-m-d H:i', strtotime($this->timestamp));
    }

    public function getContentAttribute() {
        return $this->status == 'Close' ? 'The window is closed' : 'The window is open.';
    }
}
