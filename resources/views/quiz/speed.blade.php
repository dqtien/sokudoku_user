@extends('layouts.master')

@section('title', 'Speed Training')

@section('page-css')
    <link rel="stylesheet" href="{!! asset('/assets/css/speedup_training.css') !!}">
@stop

@section('content')
    <div id="container">
      <div class="c-training" id="jsTraingSetting">
        <div class="c-training__main">
          <div class="c-initial-cover">
            <div class="c-initial-cover__inner"><img class="c-initial-cover__logo" src="/user/assets/images/speedup_training/initial_logo.png">
              <div class="p-texts">
                <div class="p-texts__line">あなたの読書スピードは</div>
                <div class="p-texts__line"><span>毎分</span><span class="p-texts__large" data-bind="text: readingSpeed()"></span><span>文字です</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-training__setting c-setting">
          <div class="c-setting__inner"><img class="c-setting__logo c-setting__logo--speedup_training" src="/user/assets/images/speedup_training/logo.png">
            <div class="c-flex-grid">
              <div class="c-flex-grid__inner">
                <div class="c-flex-grid__title">1行の<br>文字数</div>
                <div class="c-flex-grid__content">
                  <div class="c-flex-grid__content__box">
                    <div class="c-flex-grid__content__box-item"><span data-bind="text: model.singleLineInfo.hundred"></span><span class="c-vertical_arrow">
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--up" data-bind="click: upSingleLineHundred"></div>
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--down" data-bind="click: downSingleLineHundred"></div></span></div>
                    <div class="c-flex-grid__content__box-item"><span data-bind="text: model.singleLineInfo.ten"></span><span class="c-vertical_arrow">
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--up" data-bind="click: upSingleLineTen"></div>
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--down" data-bind="click: downSingleLineTen"></div></span></div>
                    <div class="c-flex-grid__content__box-item"><span data-bind="text: model.singleLineInfo.single"></span><span class="c-vertical_arrow">
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--up" data-bind="click: upSingleLineSingle"></div>
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--down" data-bind="click: downSingleLineSingle">         </div></span></div>
                  </div>
                </div>
                <div class="c-flex-grid__content__text">文字</div>
              </div>
            </div>
            <div class="c-flex-grid">
              <div class="c-flex-grid__inner">
                <div class="c-flex-grid__title">行数</div>
                <div class="c-flex-grid__content c-flex-grid__content--double">
                  <div class="c-flex-grid__content__box c-flex-grid__content__box--double">
                    <div class="c-flex-grid__content__box-item"><span data-bind="text: model.lineInfo.ten"></span><span class="c-vertical_arrow">
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--up" data-bind="click: upLineInfoTen"></div>
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--down" data-bind="click: downLineInfoTen"></div></span></div>
                    <div class="c-flex-grid__content__box-item"><span data-bind="text: model.lineInfo.single"></span><span class="c-vertical_arrow">
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--up" data-bind="click: upLineInfoSingle"></div>
                        <div class="c-vertical_arrow-item c-vertical_arrow-item--down" data-bind="click: downLineInfoSingle"></div></span></div>
                  </div>
                </div>
                <div class="c-flex-grid__content__text">行</div>
              </div>
            </div>
            <div class="c-flex-grid c-flex-grid--m-large">
              <div class="c-flex-grid__inner">
                <div class="c-flex-grid__title">点数</div>
                <div class="c-flex-grid__content c-flex-grid__content--range">
                  <div class="c-point-range">
                    <div class="c-point-range__line">
                      <div class="c-point-range__line__inner">
                        <div class="c-point-range__line-item" data-bind="css: {'is-active': model.point.num() === 1}"></div>
                        <div class="c-point-range__line-item" data-bind="css: {'is-active': model.point.num() === 2}"></div>
                        <div class="c-point-range__line-item" data-bind="css: {'is-active': model.point.num() === 3}"></div>
                        <div class="c-point-range__line-item" data-bind="css: {'is-active': model.point.num() === 4}"></div>
                        <div class="p-draggable-container" id="jsDraggableContainer">
                          <div class="c-point-range__line__circle" id="jsDraggable">
                            <div class="c-point-range__line__circle__inner"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="c-flex-grid__content__text">点</div>
              </div>
            </div>
            <div class="c-times">
              <div class="c-times__timer">
                <div class="c-times__timer__text c-times__timer__text--large" data-bind="text: model.times.remainingTime, visible: !isStopTimerView()"></div>
                <div class="c-times__timer__text c-times__timer__text--large" data-bind="visible: isStopTimerView()">5:00</div>
              </div>
            </div>
            <div class="c-speed">
              <div class="c-speed__inner">
                <div class="c-speed__arrow c-speed__arrow--left" onClick=" window.tempoSlider.down()"></div>
                <div class="c-speed__line">
                  <div class="c-speed__line__inner">
                    <div data-bind="attr: {class: tempoProgressClass()}">
                      <div class="c-speed__line__circle" data-bind="css: {'c-speed__line__circle--fixed': model. tempoCount.fix()}, click: toggleTempoFix">
                        <div class="c-speed__line__circle__inner"></div>
                        <div class="c-speed__line__circle__arrow">
                          <div class="c-speed__line__circle__arrow__text" data-bind="text: model.tempoCount.text"></div><img class="c-speed__line__circle__arrow__symbol" src="/user/assets/images/eye_exercise/arrow_yellow.png">
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
              <div class="c-controller c-controller--left"><img class="c-controller__icon c-controller__start" src="/user/assets/images/brain_spark/start.png" data-bind="click: startTimer, css: {'u-not-arrowed': isTraining()}"><img class="c-controller__icon c-controller__restart" src="/user/assets/images/brain_spark/stop.png" data-bind="click: stopTimer,css: {'u-not-arrowed': !isTraining()}"></div>
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
    <script src="{!! asset('assets/js/speedup_training.js') !!}"></script>
@stop