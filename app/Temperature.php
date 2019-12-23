<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Events\NewTemp;

class Temperature extends Model
{
    protected $fillable = ['degree'];
    public function save(array $options = [])
    {
        parent::save($options);
        event(new NewTemp($this->degree));
    }
}
