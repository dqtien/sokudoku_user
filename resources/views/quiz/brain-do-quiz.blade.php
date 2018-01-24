@extends('layouts.master')

@section('title', 'Brain Training')

@section('page-css')
    <link rel="stylesheet" href="{!! asset('assets/css/quiz/quiz-brain.css') !!}">
@stop

@section('content')
    <div class="content">
        <div class="quiz-content">
            <div class="intro">
                <img style="margin-bottom: 30px" src="{!! asset('assets/images/home/brain.png') !!}" alt="Introduce image !!!">
                <p style="color: #19264B; font-weight: 700" class="">トレーニングメニューを選びスタートを押して下さい</p>
            </div>
            <div id="flash_text" style="display: none">
                <canvas id="question-display" width="800" height="600"></canvas>
            </div>
            <div id="start-show" style="display: none"></div>
        </div>
        <div class="quiz-bar">
            <div class="type-logo">
                <img src="{!! asset('assets/images/quiz/brain-quiz-logo.png') !!}" alt="Brain quiz!">
            </div>
            <div class="question-type">
                <div class="qtype type1" style="display: none"></div>
                <div class="qtype type2" style="display: none"></div>
            </div>
            <div class="time">
                <div class="time-box count-time">
                    {!! Form::hidden('time_state', 1) !!}
                    <span>残り時間</span>
                    <div style="color: #19264B; font-weight: 700" id="clock"></div>
                </div>
                <div class="time-box setting-time">
                    <span>トレーニング時間</span>
                    <select name="duration" id="set_duration" disabled>
                        <option value="5">5 mins</option>
                        <option value="10">10 mins</option>
                        <option value="15">15 mins</option>
                    </select>
                </div>
            </div>
            <div class="actions">
                <ul>
                    <li style="margin-left: 0">
                        <button id="play" class="btn-play" type="button"></button>
                    </li>
                    <li>
                        <button id="replay" class="btn-replay" type="button"></button>
                    </li>
                    <li>
                        <button id="pause" class="btn-stop" type="button"></button>
                    </li>
                </ul>
            </div>
            <div class="other">
                {{--<a class="btn btn-default">設定</a>--}}
                <a href="{!! url('/') !!}" class="btn btn-default">終了</a>
            </div>
        </div>
    </div>
@stop

@section('page-script')
    <script src="{!! asset('assets/js/vendor/jquery.countdown.js') !!}"></script>
    <script src="{!! asset('assets/js/page/quiz-brain.js') !!}"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#set_duration').val(localStorage.getItem('duration'));
            var finalTime = new Date().getTime() + (parseInt(localStorage.getItem('duration'))*60*1000);
            $('#clock').countdown(finalTime, function(event){
                var current_time = event.offset.totalSeconds;
                $(this).html(event.strftime('<span style="color: #19264B; font-weight: 700; font-size: 18px">%H:%M:%S</span>'));
                localStorage.setItem("time", current_time);
            }).on('finish.countdown', function(event) {
                localStorage.clear();
                window.location.href = SITE_ROOT;
            });

            //action play
            $('#play').on('click', function () {
                $('div.intro').css({"display": "none"});
                $('div#start-show').css({"display": "table-cell", "vertical-align": "middle"});
                FrontEndJS.is_replay = false;
                FrontEndJS.playQuestion();

            });

            //action replay
            $('#replay').on('click', function () {
                $('div.intro').css({"display": "none"});
                $('div#start-show').css({"display": "table-cell", "vertical-align": "middle"});

                FrontEndJS.is_replay = true;
                FrontEndJS.playQuestion();
            });

            //action pause
            $('#pause').on('click', function () {
                var state = $('input[name="time_state"]').val();
                if (state == 1){
                    $('input[name="time_state"]').val(2);
                    // Pause the countdown
                    $('div#clock').countdown('stop');
                }else {
                    $('input[name="time_state"]').val(1);
                    // Pause the countdown
                    $('div#clock').countdown('resume');
                }
            });
        });
    </script>
@stop