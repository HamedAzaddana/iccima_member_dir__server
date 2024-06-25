<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title inertia>{{ env("APP_NAME","ReactLaraApp") }}</title>
    <link rel="shortcut icon" href="https://service.tccim.ir/css/favicon.png">
    @inertiaHead
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>

<body>
    @inertia
</body>

</html>