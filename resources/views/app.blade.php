<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name') }}</title>
        <script src="{{ mix('assets/app.js') }}" defer></script>
        <script>window.__INITIAL_DATA__={user:@json(Auth::user())};</script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
