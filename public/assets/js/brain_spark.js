'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrainSpark = function () {
  function BrainSpark() {
    _classCallCheck(this, BrainSpark);

    this.type = ko.observable('random');
    this.isTraining = ko.observable(false);
    this.isLoading = ko.observable(true);

    this.model = {
      options: {
        autoRepeat: ko.observable(true),
        displayTime: ko.observable(), //100
        displayInterval: ko.observable() //1500
      },
      times: {
        remainingTime: ko.observable('10:00'),
        initialTime: ko.observable(10)
      },
      random: {
        level: ko.observable(1)
      },
      sentence: {
        readingMode: ko.observable('vertical'),
        lineNum: ko.observable('single')

      }
    };
  }

  _createClass(BrainSpark, [{
    key: 'isRepeat',
    value: function isRepeat() {
      return brainSpark.isTraining() && !this.model.options.autoRepeat();
    }
  }, {
    key: 'levelClass',
    value: function levelClass() {
      return 'c-range__line__progress c-range__line__progress--' + this.model.random.level();
    }
  }, {
    key: 'toggleAutoRepeatStatus',
    value: function toggleAutoRepeatStatus() {
      if (brainSpark.isTraining()) return;
      var currentStatus = this.model.options.autoRepeat();
      this.model.options.autoRepeat(!currentStatus);
    }
  }, {
    key: 'setType',
    value: function setType(type) {
      if (this.isTraining()) return;
      this.type(type);
    }
  }, {
    key: 'isRandom',
    value: function isRandom() {
      return this.type() === 'random' ? true : false;
    }
  }, {
    key: 'isVertical',
    value: function isVertical() {
      return this.model.sentence.readingMode() === 'vertical' ? true : false;
    }
  }, {
    key: 'isLineSingle',
    value: function isLineSingle() {
      return this.model.sentence.lineNum() === 'single' ? true : false;
    }
  }, {
    key: 'addMinute',
    value: function addMinute() {
      var currentTime = Number(this.model.times.initialTime());
      if (currentTime !== 10) currentTime++;
      this.model.times.initialTime(currentTime);

      this.setInitialTime();
    }
  }, {
    key: 'minusMinute',
    value: function minusMinute() {
      var currentTime = Number(this.model.times.initialTime());
      if (currentTime !== 1) currentTime--;
      this.model.times.initialTime(currentTime);

      this.setInitialTime();
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      // loading中はタイマーはスタートできない
      if (brainSpark.isLoading()) return false;

      // repeatが押せる時
      if (brainSpark.isTraining() && brainSpark.model.options.autoRepeat()) return false;

      clearInterval(brainSpark.timer);
      brainSpark.isTraining(true);
      this.timer = setInterval('brainSpark.nextTime()', 1000);
      countDown.start();
    }
  }, {
    key: 'restartFlash',
    value: function restartFlash() {
      if (!brainSpark.isRepeat()) return;
      countDown.start(true);
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearInterval(brainSpark.timer);
      // brainSpark.model.options.autoRepeat(false)
      this.isTraining(false);
    }
  }, {
    key: 'setInitialTime',
    value: function setInitialTime() {
      var time = this.model.times.initialTime() + ':00';
      this.model.times.remainingTime(time);
    }
  }, {
    key: 'nextTime',
    value: function nextTime() {
      var cTime = this.model.times.remainingTime();
      var min = Number(cTime.split(':')[0]);
      var sec = Number(cTime.split(':')[1]);

      if (min === 0) {
        if (sec === 0) {
          alert('終了！');
          this.stopTimer();
        } else {
          sec--;
        }
      } else {
        if (sec === 0) {
          min--;
          sec = 59;
        } else {
          sec--;
        }
      }

      var nextTime = min + ':' + ('00' + sec).slice(-2);
      this.model.times.remainingTime(nextTime);
    }
  }]);

  return BrainSpark;
}();

var brainSpark = new BrainSpark();
var knockoutEl = document.getElementById('jsTraingSetting');

ko.applyBindings(brainSpark, knockoutEl);

var CountDown = function () {
  function CountDown(props) {
    _classCallCheck(this, CountDown);

    this.$wrap = $(props.elWrap);
    this.$el = $(props.el);
  }

  _createClass(CountDown, [{
    key: 'hide',
    value: function hide() {
      this.$wrap.addClass('u-hide');
      this.$el.text('3');
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var repeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var t = 500;
      this.$wrap.removeClass('u-hide');
      this.$el.velocity({ opacity: 1 }, 0).velocity({ opacity: 1 }, t).velocity({ opacity: 1 }, 0, function () {
        _this.$el.text('2');
      }).velocity({ opacity: 1 }, 0).velocity({ opacity: 1 }, t).velocity({ opacity: 1 }, 0, function () {
        _this.$el.text('1');
      }).velocity({ opacity: 1 }, 0).velocity({ opacity: 1 }, t).velocity({ opacity: 0 }, 0, function () {
        _this.hide();
        flash.flash(repeat);
        sound.play();
      });
    }
  }]);

  return CountDown;
}();

window.countDown = new CountDown({ el: '#jsCountDown', elWrap: '#jsCountDownWrap' });

var Sound = function () {
  function Sound() {
    _classCallCheck(this, Sound);

    this.context = new AudioContext();
    this.initialize();
  }

  _createClass(Sound, [{
    key: 'getAudioBuffer',
    value: function getAudioBuffer(url, fn) {
      var _this2 = this;

      var req = new XMLHttpRequest();
      req.responseType = 'arraybuffer';

      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            // array buffer を audio buffer に変換
            _this2.context.decodeAudioData(req.response, function (buffer) {
              // コールバックを実行
              fn(buffer);
            });
          }
        }
      };

      req.open('GET', url, true);
      req.send('');
    }
  }, {
    key: 'play',
    value: function play() {
      var source = this.context.createBufferSource();
      source.buffer = this.buffer;
      source.connect(this.context.destination);
      source.start(0);
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.getAudioBuffer('/user/assets/sounds/decision.mp3', function (buffer) {
        _this3.buffer = buffer;
      });
    }
  }]);

  return Sound;
}();

var sound = new Sound();

var Flash = function () {
  function Flash() {
    _classCallCheck(this, Flash);

    this.model = {
      repeat: false,
      texts: {
        visible: ko.observable(false),
        target: ko.observable([]),
        all: {
          random: [['こんにちは1', 'なにしてるんですか1', '僕の名前は深見です。1', 'わーすごーーい！1', 'ニコニコ生放送1', 'ニコニコ超パーティ1', 'ぐだくさん1', 'トータルテンボス1'], ['こんにちは2', 'なにしてるんですか2', '僕の名前は深見です。2', 'わーすごーーい！2', 'ニコニコ生放送2', 'ニコニコ超パーティ2', 'ぐだくさん2', 'トータルテンボス2'], ['こんにちは3', 'なにしてるんですか3', '僕の名前は深見です。3', 'わーすごーーい！3', 'ニコニコ生放送3', 'ニコニコ超パーティ3', 'ぐだくさん3', 'トータルテンボス3'], ['こんにちは4', 'なにしてるんですか4', '僕の名前は深見です。4', 'わーすごーーい！4', 'ニコニコ生放送4', 'ニコニコ超パーティ4', 'ぐだくさん4', 'トータルテンボス4'], ['こんにちは5', 'なにしてるんですか5', '僕の名前は深見です。5', 'わーすごーーい！5', 'ニコニコ生放送5', 'ニコニコ超パーティ5', 'ぐだくさん5', 'トータルテンボス5']],
          sentence: {
            vertical: {
              single: ['おーい！\n竜馬\nverticalSingle', 'あの日見た\n花の名前を\n僕達はまだ知らない\nverticalSingle', 'ハチワンダイバー\nverticalSingle'],
              multiple: ['おーい！\n竜馬\nverticalMultiple', 'あの日見た\n花の名前を\n僕達はまだ知らない\nverticalMultiple', 'ハチワンダイバー\nverticalMultiple']
            },
            horizon: {
              single: ['おーい！\n竜馬\nhorizonSingle', 'あの日見た\n花の名前を\n僕達はまだ知らない\nhorizonSingle', 'ハチワンダイバー\nhorizonSingle'],
              multiple: ['おーい！\n竜馬\nhorizonMultiple', 'あの日見た\n花の名前を\n僕達はまだ知らない\nhorizonMultiple', 'ハチワンダイバー\nhorizonMultiple']
            }
          }
        }
      }

    };
  }

  _createClass(Flash, [{
    key: 'isTextNotExist',
    value: function isTextNotExist(ar) {
      return ar.length === 0;
    }
  }, {
    key: 'sampleText',
    value: function sampleText() {
      var type = brainSpark.type();
      var m = brainSpark.model;

      var texts = void 0;
      var t = void 0;

      if (type === 'random') {
        texts = this.model.texts.all.random[m.random.level() - 1];
      } else {
        texts = this.model.texts.all.sentence[m.sentence.readingMode()][m.sentence.lineNum()];
      }
      return texts[Math.floor(Math.random() * texts.length)];
    }
  }, {
    key: 'isRepeatOn',
    value: function isRepeatOn() {
      return brainSpark.model.options.autoRepeat() ? true : false;
    }
  }, {
    key: 'flash',
    value: function flash() {
      var _this4 = this;

      var repeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!repeat || !this.model.texts.target()) {
        if (brainSpark.type() === 'random') {
          var tArray = this.toArray(this.sampleText());
          this.model.texts.target(this.shuffle(tArray));
        } else {
          // \nが入ったテキストが返ってくる
          var texts = this.sampleText();
          this.model.texts.target(texts.split('\n'));
        }
      }

      this.model.texts.visible(true);
      setTimeout(function () {
        _this4.model.texts.visible(false);

        // repeatだったらもう一度
        if (_this4.isRepeatOn() && brainSpark.isTraining()) {
          setTimeout(function () {
            countDown.start();
          }, brainSpark.model.options.displayInterval());
        }
      }, brainSpark.model.options.displayTime());
    }
  }, {
    key: 'polygonClass',
    value: function polygonClass() {
      return 'c-polygon c-polygon--' + this.model.texts.target().length;
    }
  }, {
    key: 'toArray',
    value: function toArray(text) {
      return text.split('');
    }
  }, {
    key: 'shuffle',
    value: function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }

      return array;
    }
  }]);

  return Flash;
}();

var Questions = function () {
  function Questions() {
    _classCallCheck(this, Questions);

    this.types = ['random', 'sentence'];
    this.random = {
      level: [1, 2, 3, 4, 5]
    };

    this.sentence = {
      readingMode: ['vertical', 'horizon'],
      lineNum: ['single', 'multiple']
    };

    this.options = this.createOptions();

    this.willInsertData = [];
  }

  _createClass(Questions, [{
    key: 'initialize',
    value: function initialize() {
      this.fetchAll();
    }

    // brainSparkの問題に入れる

  }, {
    key: 'setDataToModel',
    value: function setDataToModel() {
      var d = this.willInsertData;
      var m = flash.model.texts.all;

      d.forEach(function (item) {
        if (item.target.type === 'random') {
          m['random'][item.target.level - 1] = item.texts;
        } else {
          m['sentence'][item.target.readingMode][item.target.lineNum] = item.texts;
        }
      });
    }
  }, {
    key: 'fetchAll',
    value: function fetchAll() {
      var _this5 = this;

      setTimeout(function () {
        $.when.apply($, _this5.allInitializeXhr()).done(function (res) {
          _this5.setDataToModel();
          brainSpark.isLoading(false);
        });
      }, 1000);
    }
  }, {
    key: 'fetch',
    value: function fetch(options) {
      var _this6 = this;

      var self = this;
      var d = {};
      d.target = options.target;
      return $.ajax(options.xhr).then(function (res) {
        console.log(typeof res === 'undefined' ? 'undefined' : _typeof(res));
	console.log('res',res)
        d.texts = Array.prototype.concat.apply([], res);
        _this6.willInsertData.push(d);
      }, function (res) {
        alert('error!');
      });
    }
  }, {
    key: 'allInitializeXhr',
    value: function allInitializeXhr() {
      var _this7 = this;

      return this.options.map(function (o) {
        return _this7.fetch(o);
      });
    }
  }, {
    key: 'randomOption',
    value: function randomOption(l) {
      return {
        target: {
          type: 'random',
          level: l
        },
        xhr: {
          type: 'get',
          dataType: 'json',
          url: '/user/get-questions-brain-spark/',
          data: {
            type: 'random',
            level: l
          }
        }
      };
    }
  }, {
    key: 'sentenceOption',
    value: function sentenceOption(readingMode, lineNum) {
      return {
        target: {
          type: 'sentence',
          readingMode: readingMode,
          lineNum: lineNum
        },
        xhr: {
          type: 'get',
          dataType: 'json',
          url: '/user/get-questions-brain-spark/',
          data: {
            type: 'sentence',
            writing: readingMode,
            lineType: lineNum
          }
        }
      };
    }
  }, {
    key: 'createOptions',
    value: function createOptions() {
      var _this8 = this;

      var randomOptions = this.random.level.map(function (l) {
        return _this8.randomOption(l);
      });

      var sentenceOptions = Array.prototype.concat.apply([], this.sentence.readingMode.map(function (mode) {
        return _this8.sentence.lineNum.map(function (line) {
          return _this8.sentenceOption(mode, line);
        });
      }));

      return Array.prototype.concat(randomOptions, sentenceOptions);
    }
  }]);

  return Questions;
}();

var DisplayTimesController = function () {
  function DisplayTimesController(props) {
    _classCallCheck(this, DisplayTimesController);

    this.visible = ko.observable(false);
    this.displayTime = {
      default: {
        random: 100,
        sentence: 200
      },
      single: {
        random: 50,
        sentence: 50
      },
      max: {
        random: 200,
        sentence: 400
      },
      min: {
        random: 50,
        sentence: 50
      }
    };
    this.displayInterval = {
      default: {
        random: 1500,
        sentence: 1500
      },
      single: {
        random: 100,
        sentence: 100
      },
      max: {
        random: 3000,
        sentence: 4000
      },
      min: {
        random: 100,
        sentence: 100
      }
    };
  }

  _createClass(DisplayTimesController, [{
    key: 'initialize',
    value: function initialize() {
      this.setTime();
    }
  }, {
    key: 'setTime',
    value: function setTime() {
      brainSpark.model.options.displayTime(this.displayTime.default[brainSpark.type()]);
      brainSpark.model.options.displayInterval(this.displayInterval.default[brainSpark.type()]);
    }
  }, {
    key: 'show',
    value: function show() {
      if (brainSpark.isTraining()) return;
      this.setTime();
      this.visible(true);
    }
  }, {
    key: 'format',
    value: function format(msec) {
      return msec / 1000;
    }
  }, {
    key: 'upDisplayTime',
    value: function upDisplayTime() {
      var t = brainSpark.model.options.displayTime();
      var type = brainSpark.type();

      if (t === this.displayTime.max[type]) return;

      brainSpark.model.options.displayTime(t + this.displayTime.single[type]);
    }
  }, {
    key: 'downDisplayTime',
    value: function downDisplayTime() {
      var t = brainSpark.model.options.displayTime();
      var type = brainSpark.type();

      if (t === this.displayTime.min[type]) return;

      brainSpark.model.options.displayTime(t - this.displayTime.single[type]);
    }
  }, {
    key: 'upDisplayInterval',
    value: function upDisplayInterval() {
      var t = brainSpark.model.options.displayInterval();
      var type = brainSpark.type();

      if (t === this.displayInterval.max[type]) return;

      brainSpark.model.options.displayInterval(t + this.displayInterval.single[type]);
    }
  }, {
    key: 'downDisplayInterval',
    value: function downDisplayInterval() {
      var t = brainSpark.model.options.displayInterval();
      var type = brainSpark.type();

      if (t === this.displayInterval.min[type]) return;

      brainSpark.model.options.displayInterval(t - this.displayInterval.single[type]);
    }
  }]);

  return DisplayTimesController;
}();

var Draggable = function () {
  function Draggable(props) {
    _classCallCheck(this, Draggable);

    this.$el = $(props.el);
    this.levelPx = 45;
    this.bindEvent();
  }

  _createClass(Draggable, [{
    key: 'bindEvent',
    value: function bindEvent() {
      var self = this;
      this.$el.draggable({
        axis: 'x',
        containment: '#jsDraggableContainer',
        grid: [self.levelPx, 0],
        drag: function drag(event, ui) {
          var l = void 0;
          if (ui.originalPosition.left !== ui.position.left) {
            l = ui.position.left / self.levelPx + 1;
          } else {
            l = ui.originalPosition.left / self.levelPx + 1;
          }
          brainSpark.model.random.level(l);
        }
      });
    }
  }]);

  return Draggable;
}();

var spaceKeyDown = function spaceKeyDown() {
  $(document).keydown(function (e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      if (!brainSpark.isTraining()) {
        brainSpark.startTimer();
      } else {
        brainSpark.stopTimer();
      }
    } else if (keyCode === 37) {
      brainSpark.restartFlash();
    }
  });
};

spaceKeyDown();

window.flash = new Flash();
ko.applyBindings(flash, document.getElementById('jsTraingMain'));

window.displayTimesController = new DisplayTimesController();
displayTimesController.initialize();
ko.applyBindings(displayTimesController, document.getElementById('jsDisplayTimesSetting'));

window.drag = new Draggable({ el: '#jsDraggable' });

window.questions = new Questions();
questions.initialize();
