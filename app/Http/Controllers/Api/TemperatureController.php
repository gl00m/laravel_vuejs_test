<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\GenerateData;
use Illuminate\Http\Request;
use App\Temperature;
use Illuminate\Support\Arr;

class TemperatureController extends Controller
{
    public function start()
    {
        GenerateData::dispatch();
        return response()->json(['success' => true], 200);
    }
    public function getData()
    {
        $data = array_reverse(Temperature::orderBy('id', 'desc')->take(30)->get()->toArray());
        $data = array_map('intval', Arr::pluck($data, 'degree'));
        return response()->json(['success' => true, 'data' => $data], 200);
    }
}
