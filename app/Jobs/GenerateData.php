<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Log;

use App\Temperature;
use App\Events\NewTemp;

class GenerateData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
            $temp = new Temperature();
            $temp->degree = rand(0, 30);
            $temp->save();
            event(new NewTemp($temp->degree));
            sleep(rand(1, 3));
            $this->dispatch();
    }
}
