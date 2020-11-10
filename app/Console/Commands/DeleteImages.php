<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class DeleteImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'image:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete unused images from storage';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $images = Storage::files('public/uploads');
        foreach ($images as $image) {
            $fileName = basename($image);
            $isUsed = User::where('avatar', 'like', "%$fileName%")->exists();
            if (!$isUsed) {
                Storage::delete($image);
            }
        }

        return 0;
    }
}
