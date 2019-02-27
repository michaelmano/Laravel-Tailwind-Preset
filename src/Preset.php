<?php

namespace Alchemi\TailwindPreset;

use Illuminate\Support\Arr;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Console\Presets\Preset as LaravelPreset;

class Preset extends LaravelPreset
{
    /**
     * Install the preset.
     */
    public static function install()
    {
        static::updatePackages();

        tap(new Filesystem(), function ($filesystem) {
            $filesystem->deleteDirectory(base_path('node_modules'));
            $filesystem->cleanDirectory(resource_path('sass'));
            $filesystem->cleanDirectory(resource_path('js'));
            $filesystem->deleteDirectory(public_path('css'));
            $filesystem->deleteDirectory(public_path('js'));
            $filesystem->delete(base_path('.gitignore'));
            $filesystem->delete(base_path('.editorconfig'));
            $filesystem->delete(base_path('webpack.mix.js'));
        });

        static::updateBootstrapping();
    }

    /**
     * Update the given package array.
     *
     * @param array $packages
     *
     * @return array
     */
    protected static function updatePackageArray(array $packages)
    {
        return array_merge([
            'eslint' => '^5.12.1',
            'eslint-plugin-vue' => '^5.1.0',
            'tailwindcss' => '^0.7.4',
            'vue' => '^2.5.17',
            'vue-template-compiler' => '^2.5.22',
            'glob-all' => '^3.1.0',
            'purgecss-webpack-plugin' => '^1.4.0',
        ], Arr::except($packages, [
            'bootstrap',
            'jquery',
            'popper.js',
            'lodash',
        ]));
    }

    /**
     * Write the stubs for the Sass and JavaScript files.
     */
    protected static function updateBootstrapping()
    {
        copy(__DIR__ . '/stubs/tailwind.js', base_path('tailwind.js'));
        copy(__DIR__ . '/stubs/.gitignore', base_path('.gitignore'));
        copy(__DIR__ . '/stubs/.editorconfig', base_path('.editorconfig'));
        copy(__DIR__ . '/stubs/.eslint.json', base_path('.eslint.json'));
        copy(__DIR__ . '/stubs/webpack.mix.js', base_path('webpack.mix.js'));
        copy(__DIR__ . '/stubs/app.js', resource_path('js/app.js'));
        copy(__DIR__ . '/stubs/app.scss', resource_path('sass/app.scss'));
    }
}
