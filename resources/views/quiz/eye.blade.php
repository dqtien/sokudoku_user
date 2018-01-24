@extends('layouts.master')

@section('title', 'Eye Excercise')

@section('page-css')
    <link rel="stylesheet" href="{!! asset('assets/css/eye_exercise.css') !!}">
@stop

@section('content')
    <div id="container">
      <div class="c-training">
        <div class="c-training__main">
          <div class="p-training" id="jsFlash">
            <div class="c-loading u-hide" data-bind="css: {'u-hide': !eyeExercise.isLoading()}"><img class="c-loading__icon" src="/user/assets/images/common/spin.svg">
              <div class="c-loading__text">問題データを取得中</div>
            </div>
            <div class="p-training__text" id="jsEyeTraining" data-bind="style: {'left': leftPos(), 'top': topPos()}, text: eyeExercise.model.text, css: {'u-hide': !eyeExercise.isTraining()}"></div>
            <div class="c-initial-cover" data-bind="css: {'u-hide': eyeExercise.isTraining() || eyeExercise.isLoading()}">
              <div class="c-initial-cover__inner"><img class="c-initial-cover__logo" src="/user/assets/images/eye_exercise/initial_logo.png"></div>
            </div>
          </div>
        </div>
        <div class="c-training__setting c-setting" id="jsTraingSetting">
          <div class="c-setting__inner"><img class="c-setting__logo" src="/user/assets/images/eye_exercise/logo.png">
            <div class="c-setting__list">
              <div class="c-setting__list__outer">
                <div class="c-setting__list__item c-setting__list__item--symbol" data-bind="css: {'is-active': isSymbol()},click: function(){setType('symbol')}"></div>
                <div class="c-setting__list__item__text">記号</div>
              </div>
              <div class="c-setting__list__outer">
                <div class="c-setting__list__item c-setting__list__item--sentence" data-bind="css: {'is-active': !isSymbol()},click: function(){setType('sentence')}"></div>
                <div class="c-setting__list__item__text">文章</div>
              </div>
            </div>
            <div class="c-point-setting">
              <div class="c-point-setting__list">
                <div class="c-point-setting__list__item" data-bind="css: {'is-active': isThisTab(1)},click: function(){setPointNumber(1)}"><span>1</span><span>点</span></div>
                <div class="c-point-setting__list__item" data-bind="css: {'is-active': isThisTab(2)},click: function(){setPointNumber(2)}"><span>2</span><span>点</span></div>
                <div class="c-point-setting__list__item" data-bind="css: {'is-active': isThisTab(3)},click: function(){setPointNumber(3)}"><span>3</span><span>点</span></div>
                <div class="c-point-setting__list__item" data-bind="css: {'is-active': isThisTab(4)},click: function(){setPointNumber(4)}"><span>4</span><span>点</span></div>
              </div>
            </div>
            <div class="c-times">
              <div class="c-times__timer">
                <div class="c-times__timer__text" data-bind="text: model.times.remainingTime"></div>
              </div>
              <div class="c-times__balloon">
                <div class="c-times__balloon__times"><span class="c-times__balloon__times__time" data-bind="text: model.times.initialTime"></span><span class="c-times__balloon__times__text">分</span></div>
                <div class="c-times__balloon__arrow"><img class="c-times__balloon__arrow__up" src="/user/assets/images/brain_spark/up.png" data-bind="click: addMinute, css: {'u-not-arrowed': isTraining()}"><img class="c-times__balloon__arrow__down" src="/user/assets/images/brain_spark/down.png" data-bind="click: minusMinute, css: {'u-not-arrowed': isTraining()}"></div>
              </div>
            </div>
            <div class="c-speed">
              <div class="c-speed__inner">
                <div class="c-speed__arrow c-speed__arrow--left" onClick=" window.tempoSlider.down()"></div>
                <div class="c-speed__line">
                  <div class="c-speed__line__inner">
                    <div data-bind="attr: {class: tempoProgressClass()}">
                      <div class="c-speed__line__circle" data-bind="css: {'c-speed__line__circle--fixed': tempoCount.fix()}, click: toggleTempoFix">
                        <div class="c-speed__line__circle__inner"></div>
                        <div class="c-speed__line__circle__arrow">
                          <div class="c-speed__line__circle__arrow__text" data-bind="text: tempoCount.text"></div><img class="c-speed__line__circle__arrow__symbol" src="/user/assets/images/eye_exercise/arrow_yellow.png">
                        </div>
                      </div>
                    </div>
                    <div class="c-speed__line__list">
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                      <div class="c-speed__line__list-item"></div>
                    </div>
                  </div>
                </div>
                <div class="c-speed__arrow c-speed__arrow--right" onClick=" window.tempoSlider.up()"></div>
              </div>
            </div>
            <div class="c-realtime-speed">
              <div class="c-realtime-speed__inner">
                <div class="c-realtime-speed__text">
                   現在の読書<br>スピード</div>
                <div class="c-realtime-speed__detail"><span class="c-realtime-speed__detail__text">分速/</span><span class="c-realtime-speed__detail__count" data-bind="text: readingSpeed()"></span><span class="c-realtime-speed__detail__text2">文字</span></div>
              </div>
            </div>
            <div class="p-controll">
              <div class="c-controller c-controller--left"><img class="c-controller__icon c-controller__start" src="/user/assets/images/brain_spark/start.png" onClick="flash.start()" data-bind="css: {'u-not-arrowed': isTraining() || isLoading()}"><img class="c-controller__icon c-controller__restart" src="/user/assets/images/brain_spark/stop.png" onClick="flash.stop()" data-bind="css: {'u-not-arrowed': !isTraining()}"></div>
              <div>
                <a href="/user" class="c-sidebar-btn">終了</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
@stop

@section('page-script')
    <script src="{!! asset('assets/js/eye_exercise.js') !!}"></script>
@stop