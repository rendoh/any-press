<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name') }}</title>
        <meta property="og:site_name" content="{{ config('app.name') }}" />
        <meta property="og:title" content="{{ $title }}" />
        <meta property="og:type" content="{{ $type }}" />
        <meta property="og:url" content="{{ url($pathname) }}" />
        <meta property="og:description" content="{{ $description }}"/>
        @isset($image)
            <meta property="og:image" content="{{ $image }}" />
        @endisset
        <script src="{{ mix('assets/app.js') }}" defer></script>
        <script>window.__INITIAL_DATA__={user:@json(Auth::user())};</script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
