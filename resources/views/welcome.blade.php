@extends('layouts.master')

@section('title', 'Home page')

@section('page-css')
    <link rel="stylesheet" href="{!! asset('assets/css/index.css') !!}">
@stop

@section('content')
    <!-- Add your site or application content here -->
    <div id="container">
      <div class="bg bg--common bg--full">
        <div class="menu"><img class="menu__logo" src="{!! asset('assets/images/menu/logo.png') !!}"><img class="menu__title" src="{!! asset('/assets/images/menu/title.png') !!}" alt="トレーニングメニュー">
          <div class="menu__list">
            <div class="menu__list__item">
              <a href="{!! route('quiz.index',['type' => 'brain']) !!}">
                <div class="menu__list__item__logo menu__list__item__logo--spark"></div>
              </a>
            </div>
            <div class="menu__list__item">
              <a href="{!! route('quiz.index',['type' => 'eye']) !!}">
                <div class="menu__list__item__logo menu__list__item__logo--exercise"></div>
              </a>
            </div>
            <div class="menu__list__item">
              <a href="{!! route('quiz.index',['type' => 'speed']) !!}">
                <div class="menu__list__item__logo menu__list__item__logo--training"></div>
              </a>
            </div>
          </div>
          <div class="measures">
            <a href="{!! route('quiz.index',['type' => 'measurement']) !!}" class="measure">
              <img src="{!! asset('/assets/images/menu/history.png') !!}">
            </a>
          </div>
        </div>
      </div>
    </div>
@stop

@section('page-script')
    <script type="text/javascript">
        $(document).ready(function () {
            localStorage.clear();
        });
    </script>
@stop