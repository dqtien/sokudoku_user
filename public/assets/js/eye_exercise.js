'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EyeExercise = function () {
  function EyeExercise() {
    _classCallCheck(this, EyeExercise);

    this.type = ko.observable('symbol');
    this.pointNumber = ko.observable(1);
    this.tempoCount = {
      view: ko.observable(60),
      logic: ko.observable(60),
      text: ko.observable('Andante'),
      fix: ko.observable(false)
    };

    this.moveInfo = {
      leftOffset: 30,
      text: ko.observable('')
    };

    this.isTraining = ko.observable(false);
    this.isLoading = ko.observable(true);

    this.model = {
      times: {
        remainingTime: ko.observable('15:00'),
        initialTime: ko.observable(15)
      },
      text: ko.observable('')
    };
  }

  _createClass(EyeExercise, [{
    key: 'setType',
    value: function setType(type) {
      if (this.isTraining()) return;
      this.type(type);
    }
  }, {
    key: 'setPointNumber',
    value: function setPointNumber(num) {
      if (this.isTraining()) return;

      if (this.type() === 'sentence') {
        flash.sepalateTexts();
      }

      this.pointNumber(num);
    }
  }, {
    key: 'isThisTab',
    value: function isThisTab(num) {
      return this.pointNumber() === num ? true : false;
    }
  }, {
    key: 'isSymbol',
    value: function isSymbol() {
      return this.type() === 'symbol' ? true : false;
    }
  }, {
    key: 'tempoProgressClass',
    value: function tempoProgressClass() {
      return 'c-speed__line__progress c-speed__line__progress--' + this.tempoCount.view();
    }
  }, {
    key: 'toggleTempoFix',
    value: function toggleTempoFix() {
      var tempoFix = this.tempoCount.fix();

      this.tempoCount.fix(!tempoFix);
    }
  }, {
    key: 'readingSpeed',
    value: function readingSpeed() {
      var p = this.pointNumber();
      return Math.round(24 / p * this.tempoCount.logic());
    }
  }, {
    key: 'addMinute',
    value: function addMinute() {
      if (this.isTraining()) return;

      var currentTime = Number(this.model.times.initialTime());
      if (currentTime !== 15) currentTime++;
      this.model.times.initialTime(currentTime);
      this.setInitialTime();
    }
  }, {
    key: 'minusMinute',
    value: function minusMinute() {
      if (this.isTraining()) return;

      var currentTime = Number(this.model.times.initialTime());
      if (currentTime !== 1) currentTime--;
      this.model.times.initialTime(currentTime);
      this.setInitialTime();
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      if (eyeExercise.isTraining()) return;

      clearInterval(eyeExercise.timer);
      eyeExercise.isTraining(true);
      this.timer = setInterval('eyeExercise.nextTime()', 1000);
    }
  }, {
    key: 'restartFlash',
    value: function restartFlash() {
      if (eyeExercise.model.options.autoRepeat() || !eyeExercise.isTraining()) return;
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearInterval(eyeExercise.timer);
      // eyeExercise.model.options.autoRepeat(false)
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
          // this.stopTimer()
          flash.stop();
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

  return EyeExercise;
}();

var TempoSlider = function () {
  function TempoSlider() {
    _classCallCheck(this, TempoSlider);

    this.tempo = {
      single: 10,
      max: 300,
      viewMax: 180,
      min: 40
    };
  }

  _createClass(TempoSlider, [{
    key: 'setText',
    value: function setText() {
      var t = eyeExercise.tempoCount.logic();
      var text = void 0;

      if (t >= 180) text = 'Prestissimo';
      if (t >= 160 && t < 180) text = 'Presto';
      if (t >= 140 && t < 160) text = 'Vivace';
      if (t >= 120 && t < 140) text = 'Allegro';
      if (t >= 100 && t < 120) text = 'Allegretto';
      if (t >= 80 && t < 100) text = 'Moderate';
      if (t >= 60 && t < 80) text = 'Andante';
      if (t >= 40 && t < 60) text = 'Adagio';

      eyeExercise.tempoCount.text(text);
    }
  }, {
    key: 'isFixed',
    value: function isFixed() {
      return eyeExercise.tempoCount.fix();
    }
  }, {
    key: 'up',
    value: function up() {
      if (this.isFixed()) return;

      var tL = eyeExercise.tempoCount.logic();
      var tV = void 0;

      if (tL < 300) {
        tL = tL + this.tempo.single;
      }

      if (tL >= this.tempo.viewMax) {
        tV = this.tempo.viewMax;
      } else {
        tV = tL;
      }

      eyeExercise.tempoCount.logic(tL);
      eyeExercise.tempoCount.view(tV);
      this.setText();
    }
  }, {
    key: 'down',
    value: function down() {
      if (this.isFixed()) return;

      var tL = eyeExercise.tempoCount.logic();
      var tV = void 0;

      tL = tL - this.tempo.single;

      if (tL < 40) {
        tL = 40;
      }

      if (tL >= this.tempo.viewMax) {
        tV = this.tempo.viewMax;
      } else {
        tV = tL;
      }

      eyeExercise.tempoCount.logic(tL);
      eyeExercise.tempoCount.view(tV);
      this.setText();
    }
  }]);

  return TempoSlider;
}();

window.tempoSlider = new TempoSlider();
var eyeExercise = new EyeExercise();
var knockoutEl = document.getElementById('jsTraingSetting');

ko.applyBindings(eyeExercise, knockoutEl);

var Sound = function () {
  function Sound() {
    _classCallCheck(this, Sound);

    this.context = new AudioContext();
    this.initialize();
  }

  _createClass(Sound, [{
    key: 'getAudioBuffer',
    value: function getAudioBuffer(url, fn) {
      var _this = this;

      var req = new XMLHttpRequest();
      req.responseType = 'arraybuffer';

      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            // array buffer を audio buffer に変換
            _this.context.decodeAudioData(req.response, function (buffer) {
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
      var _this2 = this;

      this.getAudioBuffer('/user/assets/sounds/eye.mp3', function (buffer) {
        _this2.buffer = buffer;
      });
    }
  }]);

  return Sound;
}();

var sound = new Sound();

var Questions = function () {
  function Questions() {
    _classCallCheck(this, Questions);

    this.types = ['random', 'sentence'];
    this.symbols = [];
    this.sentence = '';
  }

  _createClass(Questions, [{
    key: 'initialize',
    value: function initialize() {
      this.fetchAll();
    }

    // eyeExerciseの問題に入れる

  }, {
    key: 'setDataToModel',
    value: function setDataToModel() {
      var d = this.willInsertData;
      console.log(d)
      console.log(flash.model.texts)
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
    key: 'fetchSymbols',
    value: function fetchSymbols() {
      var self = this;
      return $.ajax({
        type: 'get',
        url: '/user/get-questions-eye-exercise',
        data: {
          type: 'symbol'
        }
      }).then(function (res) {
        flash.symbols = Array.prototype.concat.apply([], JSON.parse(res));
      }, function (res) {
        alert('エラーが発生しました。リロードして下さい。');
      });
    }
  }, {
    key: 'fetchSentence',
    value: function fetchSentence() {
      var self = this;
      return $.ajax({
        type: 'get',
        url: '/user/get-questions-eye-exercise',
        data: {
          type: 'sentence'
        }
      }).then(function (res) {
        flash.sentence.originalText = JSON.parse(res);
      }, function (res) {
        alert('エラーが発生しました。リロードして下さい。');
      });
    }
  }, {
    key: 'fetchAll',
    value: function fetchAll() {
      var _this3 = this;

      setTimeout(function () {
        $.when.apply($, [_this3.fetchSymbols(), _this3.fetchSentence()]).done(function (res) {
          // _this3.setDataToModel();
          eyeExercise.isLoading(false);
        });
      }, 1000);
    }
  }]);

  return Questions;
}();

var Flash = function () {
  function Flash() {
    _classCallCheck(this, Flash);

    var SIDEBAR_WIDTH = 300;
    this.$el = $('#jsEyeTraining');

    this.model = {
      moveToLeftOffset: 30
    };

    this.readingSpeedData = [{
      topInterval: 0,
      wSize: 24
    }, {
      topInterval: 300,
      wSize: 12
    }, {
      topInterval: 210,
      wSize: 8
    }, {
      topInterval: 160,
      wSize: 6
    }];

    this.verticalPoint = -1;

    this.symbols = ['△', '○', '◇', '★'];
    this.sentence = {
      originalText: '',
      sepalateCount: this.readingSpeedData[eyeExercise.pointNumber() - 1].wSize,
      currentTextsNumber: 0,
      texts: []
    };

    this.verticalPx = this.readingSpeedData[eyeExercise.pointNumber() - 1].topInterval;

    this.initialLeftPos = $(window).width() - 10 - SIDEBAR_WIDTH - this.model.moveToLeftOffset;

    this.model.position = ko.observable(this.initialLeftPos);
    this.model.verticalPosition = ko.observable(0);
  }

  _createClass(Flash, [{
    key: 'sepalateTexts',
    value: function sepalateTexts() {

      this.sentence.sepalateCount = this.readingSpeedData[eyeExercise.pointNumber() - 1].wSize;

      var req = new RegExp("[\\s\\S]{1," + this.sentence.sepalateCount + '}', 'g');
      this.sentence.texts = this.sentence.originalText.match(req) || [];
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      //ajax
      if (eyeExercise.type() === 'symbol') {}
    }

    // 現在表示されている記号以外の記号を返す

  }, {
    key: 'randomSymbol',
    value: function randomSymbol() {
      var s = this.symbols;
      var cSymbol = eyeExercise.model.text().split('')[0];

      var isSameSymbol = true;
      while (isSameSymbol) {
        var c = s[Math.floor(Math.random() * s.length)];
        if (cSymbol !== c) {
          isSameSymbol = false;
          return c;
        }
      }
    }
  }, {
    key: 'setSymbol',
    value: function setSymbol() {
      //ajax
      // ['△', '○', '◇', '★']
      var symbols = ['△', '○', '◇', '★'];
      var texts = symbols.map(function (item) {
        return Array(24 + 1).join(item);
      });
      this.model.symbol = {
        texts: texts
      };
    }

    // 記号を受け取り、x文字のテキストを作成する

  }, {
    key: 'createSymbolText',
    value: function createSymbolText(sym) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 24;

      return Array(x + 1).join(sym);
    }

    // x点から次の場所を探して移動する

  }, {
    key: 'setNextPosition',
    value: function setNextPosition() {
      // x点まで言ってない場合はtopからの位置をずらす
      if (this.verticalPoint < eyeExercise.pointNumber() - 1) {
        this.verticalPoint++;
        this.model.verticalPosition(this.readingSpeedData[eyeExercise.pointNumber() - 1].topInterval * this.verticalPoint);
      } else {
        var p = this.model.position();
        var nextP = p - this.model.moveToLeftOffset;

        if (nextP < -5) {
          nextP = this.initialLeftPos;
        }
        this.verticalPoint = 0;
        this.model.verticalPosition(0);
        this.model.position(nextP);
      }
    }
  }, {
    key: 'setNextSymbolText',
    value: function setNextSymbolText() {
      var t = this.createSymbolText(this.randomSymbol(), this.readingSpeedData[eyeExercise.pointNumber() - 1].wSize);
      eyeExercise.model.text(t);
    }
  }, {
    key: 'setNextSentenceText',
    value: function setNextSentenceText() {
      var t = this.sentence.texts[this.sentence.currentTextsNumber];
      eyeExercise.model.text(t);

      this.sentence.currentTextsNumber++;
    }
  }, {
    key: 'leftPos',
    value: function leftPos() {
      return this.model.position() + 'px';
    }
  }, {
    key: 'topPos',
    value: function topPos() {
      return this.model.verticalPosition() + 'px';
    }
  }, {
    key: 'repeatTime',
    value: function repeatTime() {
      // 300とか
      var t = eyeExercise.tempoCount.logic();

      console.log('called');

      // 60s = 60000ms
      return 60000 / t;
    }
  }, {
    key: 'start',
    value: function start() {
      if (eyeExercise.isTraining() || eyeExercise.isLoading()) return;

      if (eyeExercise.type() === 'symbol') {
        this.startSymbolLine();
      } else {
        this.sepalateTexts();
        this.startSentence();
      }
      this.clock = setInterval(function () {
        eyeExercise.nextTime();
      }, 1000);
      eyeExercise.isTraining(true);
    }
  }, {
    key: 'startSentence',
    value: function startSentence() {
      var _this4 = this;

      var timer = function timer() {
        sound.play();
        _this4.setNextSentenceText();
        _this4.setNextPosition();
        _this4.timer = setTimeout(timer, _this4.repeatTime());
      };
      timer();
    }
  }, {
    key: 'startSymbolLine',
    value: function startSymbolLine() {
      var _this5 = this;

      var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var timer = function timer() {
        sound.play();
        _this5.setNextSymbolText();
        _this5.setNextPosition();
        _this5.timer = setTimeout(timer, _this5.repeatTime());
      };
      timer();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!eyeExercise.isTraining()) return;
      clearInterval(this.clock);
      clearTimeout(this.timer);
      this.verticalPoint = -1;
      this.sentence.currentTextsNumber = 0;
      this.model.position(this.initialLeftPos);
      eyeExercise.isTraining(false);
    }
  }, {
    key: 'isLestMost',
    value: function isLestMost() {
      return false;
    }
  }]);

  return Flash;
}();

window.flash = new Flash();
ko.applyBindings(flash, document.getElementById('jsFlash'));

var spaceKeyDown = function spaceKeyDown() {
  $(document).keydown(function (e) {
    var keyCode = e.keyCode;
    if (keyCode === 32) {
      eyeExercise.toggleTempoFix();
    } else if (keyCode === 13) {
      if (!eyeExercise.isTraining()) {
        flash.start();
      } else {
        flash.stop();
      }
    } else if (keyCode === 37) {
      tempoSlider.down();
    } else if (keyCode === 39) {
      tempoSlider.up();
    }
  });
};

spaceKeyDown();

// window.flash = new Flash()
// ko.applyBindings(flash, document.getElementById('jsTraingMain'))

window.questions = new Questions();
questions.initialize();
