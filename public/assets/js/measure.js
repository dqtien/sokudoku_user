'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpeedupTraining = function () {
  function SpeedupTraining() {
    _classCallCheck(this, SpeedupTraining);

    this.type = ko.observable('random');
    this.isTraining = ko.observable(false);
    this.resultVisible = ko.observable(false);

    this.model = {
      singleLineInfo: {
        hundred: ko.observable(0),
        ten: ko.observable(0),
        single: ko.observable(0)
      },
      lineInfo: {
        ten: ko.observable(0),
        single: ko.observable(0)
      },
      point: {
        num: ko.observable(2)
      },
      tempoCount: {
        view: ko.observable(60),
        logic: ko.observable(60),
        text: ko.observable('Andante'),
        fix: ko.observable(false)
      },
      times: {
        remainingTime: ko.observable('3:00'),
        initialTime: ko.observable(3)
      }
    };
  }

  _createClass(SpeedupTraining, [{
    key: 'readingSpeed',
    value: function readingSpeed() {
      var singleLine = this.model.singleLineInfo.hundred() * 100 + this.model.singleLineInfo.ten() * 10 + this.model.singleLineInfo.single();

      var lineInfo = this.model.lineInfo.ten() * 10 + this.model.lineInfo.single();

      var point = this.model.point.num();

      var tempo = this.model.tempoCount.logic();

      var result = singleLine * lineInfo / point * tempo;

      return this.resultVisible() ? result : '?????';
    }
  }, {
    key: 'upSingleLineHundred',
    value: function upSingleLineHundred() {
      var c = this.model.singleLineInfo.hundred();

      if (c === 9) return;

      this.model.singleLineInfo.hundred(c + 1);
    }
  }, {
    key: 'downSingleLineHundred',
    value: function downSingleLineHundred() {
      var c = this.model.singleLineInfo.hundred();

      if (c === 0) return;

      this.model.singleLineInfo.hundred(c - 1);
    }
  }, {
    key: 'upSingleLineTen',
    value: function upSingleLineTen() {
      var c = this.model.singleLineInfo.ten();

      if (c === 9) return;

      this.model.singleLineInfo.ten(c + 1);
    }
  }, {
    key: 'downSingleLineTen',
    value: function downSingleLineTen() {
      var c = this.model.singleLineInfo.ten();

      if (c === 0) return;

      this.model.singleLineInfo.ten(c - 1);
    }
  }, {
    key: 'upSingleLineSingle',
    value: function upSingleLineSingle() {
      var c = this.model.singleLineInfo.single();

      if (c === 9) return;

      this.model.singleLineInfo.single(c + 1);
    }
  }, {
    key: 'downSingleLineSingle',
    value: function downSingleLineSingle() {
      var c = this.model.singleLineInfo.single();

      if (c === 0) return;

      this.model.singleLineInfo.single(c - 1);
    }
  }, {
    key: 'upLineInfoTen',
    value: function upLineInfoTen() {
      var c = this.model.lineInfo.ten();

      if (c === 9) return;

      this.model.lineInfo.ten(c + 1);
    }
  }, {
    key: 'downLineInfoTen',
    value: function downLineInfoTen() {
      var c = this.model.lineInfo.ten();

      if (c === 0) return;

      this.model.lineInfo.ten(c - 1);
    }
  }, {
    key: 'upLineInfoSingle',
    value: function upLineInfoSingle() {
      var c = this.model.lineInfo.single();

      if (c === 9) return;

      this.model.lineInfo.single(c + 1);
    }
  }, {
    key: 'downLineInfoSingle',
    value: function downLineInfoSingle() {
      var c = this.model.lineInfo.single();

      if (c === 0) return;

      this.model.lineInfo.single(c - 1);
    }
  }, {
    key: 'levelClass',
    value: function levelClass() {
      return 'c-range__line__progress c-range__line__progress--' + this.model.random.level();
    }
  }, {
    key: 'tempoProgressClass',
    value: function tempoProgressClass() {
      return 'c-speed__line__progress c-speed__line__progress--' + this.model.tempoCount.view();
    }
  }, {
    key: 'toggleTempoFix',
    value: function toggleTempoFix() {
      var tempoFix = this.model.tempoCount.fix();

      this.model.tempoCount.fix(!tempoFix);
    }
  }, {
    key: 'addMinute',
    value: function addMinute() {
      if (this.isTraining()) return;

      var currentTime = Number(this.model.times.initialTime());
      if (currentTime !== 5) currentTime++;
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
    key: 'repeatTime',
    value: function repeatTime() {
      // 300とか
      var t = this.model.tempoCount.logic();

      console.log('called');

      // 60s = 60000ms
      return 60000 / t;
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this = this;

      if (speedupTraining.isTraining()) return;

      speedupTraining.isTraining(true);

      this.resultVisible(false);

      if (this.model.times.remainingTime() === '0:00') {
        this.setInitialTime();
      }

      var timer = function timer() {
        sound.play();
        _this.timer = setTimeout(timer, _this.repeatTime());
      };
      this.clock = setInterval(function () {
        speedupTraining.nextTime();
      }, 1000);
      timer();
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearTimeout(this.timer);
      clearInterval(this.clock);
      this.isTraining(false);
    }
  }, {
    key: 'setInitialTime',
    value: function setInitialTime() {
      var time = this.model.times.initialTime() + ':00';
      console.log(time);
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
          this.resultVisible(true);
          alert('\u4ECA\u56DE\u306F\u6BCE\u5206' + this.readingSpeed() + '\u6587\u5B57\u3067\u3057\u305F\uFF01');
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

  return SpeedupTraining;
}();

var speedupTraining = new SpeedupTraining();
var knockoutEl = document.getElementById('jsTraingSetting');

ko.applyBindings(speedupTraining, knockoutEl);

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
      var t = speedupTraining.model.tempoCount.logic();
      var text = void 0;

      if (t >= 180) text = 'Prestissimo';
      if (t >= 160 && t < 180) text = 'Presto';
      if (t >= 140 && t < 160) text = 'Vivace';
      if (t >= 120 && t < 140) text = 'Allegro';
      if (t >= 100 && t < 120) text = 'Allegretto';
      if (t >= 80 && t < 100) text = 'Moderate';
      if (t >= 60 && t < 80) text = 'Andante';
      if (t >= 40 && t < 60) text = 'Adagio';

      speedupTraining.model.tempoCount.text(text);
    }
  }, {
    key: 'isFixed',
    value: function isFixed() {
      return speedupTraining.model.tempoCount.fix();
    }
  }, {
    key: 'up',
    value: function up() {
      if (this.isFixed()) return;

      var tL = speedupTraining.model.tempoCount.logic();
      var tV = void 0;

      if (tL < 300) {
        tL = tL + this.tempo.single;
      }

      if (tL >= this.tempo.viewMax) {
        tV = this.tempo.viewMax;
      } else {
        tV = tL;
      }

      speedupTraining.model.tempoCount.logic(tL);
      speedupTraining.model.tempoCount.view(tV);
      this.setText();
    }
  }, {
    key: 'down',
    value: function down() {
      if (this.isFixed()) return;

      var tL = speedupTraining.model.tempoCount.logic();
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

      speedupTraining.model.tempoCount.logic(tL);
      speedupTraining.model.tempoCount.view(tV);
      this.setText();
    }
  }]);

  return TempoSlider;
}();

window.tempoSlider = new TempoSlider();

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

      this.getAudioBuffer('/user/assets/sounds/speedup.mp3', function (buffer) {
        _this3.buffer = buffer;
      });
    }
  }]);

  return Sound;
}();

var sound = new Sound();

var Draggable = function () {
  function Draggable(props) {
    _classCallCheck(this, Draggable);

    this.$el = $(props.el);
    this.levelPx = 41.5;
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
          speedupTraining.model.point.num(l);
        }
      });
    }
  }]);

  return Draggable;
}();

window.drag = new Draggable({ el: '#jsDraggable' });

var spaceKeyDown = function spaceKeyDown() {
  $(document).keydown(function (e) {
    var keyCode = e.keyCode;
    if (keyCode === 32) {
      speedupTraining.toggleTempoFix();
    } else if (keyCode === 13) {
      if (!speedupTraining.isTraining()) {
        speedupTraining.startTimer();
      } else {
        speedupTraining.stopTimer();
      }
    } else if (keyCode === 37) {
      tempoSlider.down();
    } else if (keyCode === 39) {
      tempoSlider.up();
    }
  });
};

spaceKeyDown();