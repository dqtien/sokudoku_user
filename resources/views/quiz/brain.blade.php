@extends('layouts.master')

@section('title', 'Brain Training')

@section('page-css')
    <link rel="stylesheet" href="{!! asset('assets/css/brain_spark.css') !!}">
    <!--<link rel="stylesheet" href="{!! asset('assets/css/quiz/quiz-brain.css') !!}">-->
    
@stop

@section('content')
    <div id="container">
      <div class="c-training">
        <div class="c-training__main" id="jsTraingMain">
          <div class="c-loading u-hide" data-bind="css: {'u-hide': !brainSpark.isLoading()}"><img class="c-loading__icon" src="/user/assets/images/common/spin.svg">
            <div class="c-loading__text">問題データを取得中</div>
          </div>
          <div class="u-hide" data-bind="css: {'u-hide': brainSpark.isLoading()}">
            <div class="c-initial-cover" data-bind="css: {'u-hide': brainSpark.isTraining()}">
              <div class="c-initial-cover__inner"><img class="c-initial-cover__logo" src="/user/assets/images/brain_spark/initial_logo.png"><img class="c-initial-cover__text" src="/user/assets/images/brain_spark/initial_text.png"></div>
            </div>
            <div class="c-countdown u-hide" id="jsCountDownWrap">
              <div class="c-countdown__inner" id="jsCountDown">3</div>
            </div>
            <div class="c-cover u-hide" data-bind="css: {'u-hide': !model.texts.visible()}"><!-- ko if: brainSpark.type() === 'random' -->
              <div class="c-polygon" data-bind="attr: {'class': polygonClass()}">
                <div class="c-polygon__center"><!-- ko foreach: model.texts.target -->
                  <div class="c-polygon__line"><span data-bind="text: $data"></span></div><!-- /ko -->
                </div>
              </div><!-- /ko -->
<!-- ko if: brainSpark.type() === 'sentence' -->
              <div class="p-sentence" data-bind="css: {'p-sentence--vertical': brainSpark.model.sentence.readingMode() === 'vertical'}"><!-- ko foreach: model.texts.target -->
                <div data-bind="text: $data"></div><!-- /ko -->
              </div><!-- /ko -->
            </div>
          </div>
        </div>
        <div class="c-training__setting c-setting" id="jsTraingSetting">
          <div class="c-setting__inner"><img class="c-setting__logo" src="/user/assets/images/brain_spark/logo.png">
            <div class="c-setting__list">
              <div class="c-setting__list__outer">
                <div class="c-setting__list__item c-setting__list__item--random" data-bind="css: {'is-active': isRandom()}, click: function(){setType('random')}"></div>
                <div class="c-setting__list__item__text">ランダム</div>
              </div>
              <div class="c-setting__list__outer">
                <div class="c-setting__list__item c-setting__list__item--sentence" data-bind="css: {'is-active': !isRandom()}, click: function(){setType('sentence')}"></div>
                <div class="c-setting__list__item__text">文章</div>
              </div>
            </div>
            <div class="c-sentence-setting u-hide" data-bind="css: {'u-hide': isRandom()}">
              <div class="c-sentence-setting__list">
                <div class="c-sentence-setting__list__outer">
                  <div class="c-sentence-setting__list__item c-sentence-setting__list__item--vertical" data-bind="css: {'is-active': isVertical()}, click: function(){model.sentence.readingMode('vertical')}"></div>
                  <div class="c-sentence-setting__list__item__text">縦読み</div>
                </div>
                <div class="c-sentence-setting__list__outer">
                  <div class="c-sentence-setting__list__item c-sentence-setting__list__item--horizon" data-bind="css: {'is-active': !isVertical()}, click: function(){model.sentence.readingMode('horizon')}"></div>
                  <div class="c-sentence-setting__list__item__text">横読み</div>
                </div>
              </div>
              <div class="c-sentence-setting__list">
                <div class="c-sentence-setting__list__outer">
                  <div class="c-sentence-setting__list__item c-sentence-setting__list__item--circle" data-bind="css: {'is-active': isLineSingle()}, click: function(){model.sentence.lineNum('single')}"></div>
                  <div class="c-sentence-setting__list__item__text">1行</div>
                </div>
                <div class="c-sentence-setting__list__outer">
                  <div class="c-sentence-setting__list__item c-sentence-setting__list__item--circle" data-bind="css: {'is-active': !isLineSingle()}, click: function(){model.sentence.lineNum('multiple')}"></div>
                  <div class="c-sentence-setting__list__item__text">複数行</div>
                </div>
              </div>
            </div>
            <div class="c-range u-hide" data-bind="css: {'u-hide': !isRandom()}">
              <div class="c-range__line">
                <div class="c-range__line__list">
                  <div class="c-range__controller-container" id="jsDraggableContainer">
                    <div class="c-range__controller" id="jsDraggable">
                      <div class="c-range__controller__text"><span>レベル</span><span data-bind="text: brainSpark.model.random.level"></span></div><img class="c-range__controller__arrow" src="/user/assets/images/brain_spark/arrow_yellow.png">
                    </div>
                  </div>
                  <div class="c-range__line__list-item"></div>
                  <div class="c-range__line__list-item"></div>
                  <div class="c-range__line__list-item"></div>
                  <div class="c-range__line__list-item"></div>
                  <div class="c-range__line__list-item"></div>
                  <div class="c-range__line__list-item"></div>
                </div>
                <div class="c-range__line__progress" data-bind="css: levelClass()"></div>
              </div>
            </div>
            <div class="c-times">
              <div class="c-times__timer">
                <div class="c-times__timer__text" data-bind="text: model.times.remainingTime"></div>
              </div>
              <div class="c-times__balloon">
                <div class="c-times__balloon__times"><span class="c-times__balloon__times__time" data-bind="text: model.times.initialTime"></span><span class="c-times__balloon__times__text">分</span></div>
                <div class="c-times__balloon__arrow"><img class="c-times__balloon__arrow__up" src="/user/assets/images/brain_spark/up.png" data-bind="click: addMinute"><img class="c-times__balloon__arrow__down" src="/user/assets/images/brain_spark/down.png" data-bind="click: minusMinute"></div>
              </div>
            </div>
            <div class="c-controller"><img class="c-controller__icon c-controller__start" src="/user/assets/images/brain_spark/start.png" data-bind="click: startTimer, css: {'u-not-arrowed': (brainSpark.isTraining() &amp;&amp; brainSpark.model.options.autoRepeat()) || brainSpark.isLoading()}"><img class="c-controller__icon c-controller__restart" src="/user/assets/images/brain_spark/restart.png" data-bind="click: restartFlash, css: {'u-not-arrowed': brainSpark.isTraining() &amp;&amp; brainSpark.model.options.autoRepeat()}"><img class="c-controller__icon c-controller__stop" src="/user/assets/images/brain_spark/stop.png" data-bind="click: stopTimer"></div>
            <div class="c-auto-status">
              <div class="c-auto-status__line is-active" data-bind="css: {'is-active': model.options.autoRepeat()},">
                <div class="c-auto-status__line__circle" data-bind="click: toggleAutoRepeatStatus, css: {'u-not-arrowed': brainSpark.isTraining()}"></div>
                <div class="c-auto-status__line__text c-auto-status__line__text--on">ON</div>
                <div class="c-auto-status__line__text c-auto-status__line__text--off">OFF</div>
              </div>
            </div>
            <div class="c-setting-btns">
              <div class="c-setting-btns__item" onClick=" window.displayTimesController.show()" data-bind="css: {'u-not-arrowed': brainSpark.isTraining()}">設定</div>
              <a href="/user" class="c-setting-btns__item c-setting-btns__item--right">終了</a>
            </div>
          </div>
        </div>
      </div>
      <div class="c-display-setting u-hide" id="jsDisplayTimesSetting" data-bind="css: {'u-hide': !visible()}">
        <div class="c-display-setting__inner">
          <div class="c-display-setting__title">設定</div>
          <div class="c-display-setting__content">
            <div class="c-display-setting__content__title">表示時間</div>
            <div class="c-display-setting__content__settings">
              <div class="c-display-setting__content__settings__inner">
                <div class="c-display-setting__content__settings__time"><span data-bind="text: format(brainSpark.model.options.displayTime())"></span><span>秒</span></div>
                <div class="c-display-setting__content__settings__btns">
                  <div data-bind="click: displayTimesController.upDisplayTime">△</div>
                  <div data-bind="click: displayTimesController.downDisplayTime">▽</div>
                </div>
              </div>
            </div>
          </div>
          <div class="c-display-setting__content">
            <div class="c-display-setting__content__title">表示間隔</div>
            <div class="c-display-setting__content__settings">
              <div class="c-display-setting__content__settings__inner">
                <div class="c-display-setting__content__settings__time"><span data-bind="text: format(brainSpark.model.options.displayInterval())"></span><span>秒</span></div>
                <div class="c-display-setting__content__settings__btns">
                  <div data-bind="click: displayTimesController.upDisplayInterval">△</div>
                  <div data-bind="click: displayTimesController.downDisplayInterval">▽</div>
                </div>
              </div>
            </div>
          </div>
          <div class="c-display-setting__submit">
            <div class="c-display-setting__submit__btn" data-bind="click: function(){visible(false)}">決定</div>
          </div>
        </div>
      </div>
    </div>
@stop

@section('page-script')
    <script src="{!! asset('assets/js/brain_spark.js') !!}"></script>
@stop