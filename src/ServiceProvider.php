<?php

namespace BCM\FrontendStack;

use Illuminate\Support\ServiceProvider as Provider;
use Illuminate\Foundation\Console\PresetCommand;

class ServiceProvider extends Provider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        PresetCommand::macro('bcm', function($command) {
            Preset::install();
            $command->info('The BCM Frontend stack has been installed.');
            $command->info('Please finish the installation by running `npm install` or `yarn`');
        });
    }
}