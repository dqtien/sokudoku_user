<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>
        @section('title')
            Sokudoku
        @show
    </title>

    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta content="{!! csrf_token() !!}" name="csrf-token">

    <link rel="apple-touch-icon" href="{!! asset('apple-touch-icon.png') !!}">
    <link rel="icon" href="{!! asset('favicon.ico') !!}">
    <!--[if IE]><link rel="shortcut icon" href="{!! asset('favicon.ico') !!}"><![endif]-->
    <!-- or, set /favicon.ico for IE10 win -->
    <meta name="msapplication-TileColor" content="#D83434">
    <meta name="msapplication-TileImage" content="tile.png">
    <!-- Place favicon.ico in the root directory -->

    <link rel="stylesheet" href="{!! asset('assets/css/normalize.css') !!}">
    <link rel="stylesheet" href="{!! asset('assets/css/app.css') !!}">

    @yield('page-css')
    

    <script src="{!! asset('assets/js/vendor/modernizr-2.8.3.min.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/jquery-3.1.1.min.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/velocity.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/knockout.js') !!}"></script>
    <script src="{!! asset('assets/js/vendor/jquery-ui.min.js') !!}"></script>
</head>
<body class="{!! active_class(if_route('home'),'body-background home') !!}">
<!--[if lte IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience and security.</p>
<![endif]-->

<!-- Add your site or application content here -->
@yield('content')
<!--<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha512"-->
<!--crossorigin="anonymous"></script>-->
<script>
    SITE_ROOT = '{!! url("/") !!}';
</script>
<script>window.jQuery || document.write('<script src="{!! asset('assets/js/vendor/jquery-3.1.1.min.js') !!}"><\/script>')</script>

<script src="{!! asset('assets/js/app.js') !!}"></script>

<!-- Page script -->
@yield('page-script')

<!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
{{--<script>--}}
    {{--window.ga = function () {--}}
        {{--ga.q.push(arguments)--}}
    {{--};--}}
    {{--ga.q = [];--}}
    {{--ga.l = +new Date;--}}
    {{--ga('create', 'UA-XXXXX-Y', 'auto');--}}
    {{--ga('send', 'pageview')--}}
{{--</script>--}}
{{--<script src="https://www.google-analytics.com/analytics.js" async defer></script>--}}
</body>
</html>