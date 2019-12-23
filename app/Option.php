<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Jobs\GenerateData;
use Log;

class Option extends Model
{
    protected $fillable = ['name'];
    public static function getGen() {
        $gen = Option::where('name', 'gen')->first();

        return(($gen) ? boolval($gen->value) : false);

    }
    public static function setGen($value) {
        $gen = Option::firstOrCreate(['name' => 'gen']);
        $gen->value = $value;
        $gen->save();
        if ($value) GenerateData::dispatch();
    }
}
