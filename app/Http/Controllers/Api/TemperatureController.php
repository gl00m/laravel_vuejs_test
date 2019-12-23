<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Temperature;
use Illuminate\Support\Arr;
use App\Option;
use Log;

class TemperatureController extends Controller
{
    public function start()
    {
        Option::setGen(true);
        return response()->json(['success' => true], 200);
    }
    public function stop()
    {
        Option::setGen(false);
        return response()->json(['success' => true], 200);
    }
    public function getData()
    {
        $data = array_reverse(Temperature::orderBy('id', 'desc')->take(30)->get()->toArray());
        $data = array_map('intval', Arr::pluck($data, 'degree'));
        return response()->json(['success' => true, 'data' => $data], 200);
    }
}
