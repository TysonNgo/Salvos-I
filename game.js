(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function Key(button, down) {
  _classCallCheck(this, Key);

  this.button = button;
  this.down = down;
  this.held = false;
};

module.exports =
/*#__PURE__*/
function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.up = new Key('up', false);
    this.down = new Key('down', false);
    this.left = new Key('left', false);
    this.right = new Key('right', false);
    this.shoot = new Key('shoot', false);
    this.shield = new Key('shield', false);
    this.keys = {
      'ArrowUp': this.up,
      'ArrowDown': this.down,
      'ArrowLeft': this.left,
      'ArrowRight': this.right,
      'KeyX': this.shoot,
      'KeyZ': this.shield
    };
  }

  _createClass(Controller, [{
    key: "getKey",
    value: function getKey(button) {
      if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)) {
        button = this[button];

        for (var key in this.keys) {
          if (this.keys[key] === button) {
            return key;
          }
        }
      }
    }
  }, {
    key: "changeKey",
    value: function changeKey(button, key) {
      if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)) {
        // if key exists, swap buttons
        // if key does not exist, assign button to key
        //  and delete old button
        var tempKey;

        if (key in this.keys) {
          tempKey = this.keys[key];
          if (tempKey.button === button) return false;

          for (var k in this.keys) {
            if (this.keys[k].button === button) {
              this.keys[key] = this.keys[k];
              this.keys[k] = tempKey;
              return true;
            }
          }
        } else {
          for (var _k in this.keys) {
            if (this.keys[_k].button === button) {
              this.keys[key] = this.keys[_k];
              delete this.keys[_k];
              return true;
            }
          }
        }
      }

      return false;
    }
  }, {
    key: "press",
    value: function press(key) {
      if (key in this.keys) {
        if (this.keys[key].down) {
          this.keys[key].held = true;
        }

        this.keys[key].down = true;
      }
    }
  }, {
    key: "release",
    value: function release(key) {
      if (key in this.keys) {
        this.keys[key].down = false;
        this.keys[key].held = false;
      }
    }
  }, {
    key: "releaseAll",
    value: function releaseAll() {
      for (var key in this.keys) {
        this.keys[key].down = false;
      }
    }
  }, {
    key: "pressingButton",
    value: function pressingButton() {
      var button = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)) {
        return this[button].down;
      }

      return Object.values(this.keys).some(function (k) {
        return k.down;
      });
    }
  }, {
    key: "buttonHeld",
    value: function buttonHeld(button) {
      if (~['up', 'down', 'left', 'right', 'shoot', 'shield'].indexOf(button)) {
        return this[button].held;
      }

      return false;
    }
  }]);

  return Controller;
}();

},{}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function _class(scene) {
    _classCallCheck(this, _class);

    this.scene = scene;
    this.speedlines = Array(100);

    for (var i = 0; i < this.speedlines.length; i++) {
      this.speedlines[i] = this.scene.add.sprite(Math.random() * this.scene.game.canvas.width, Math.random() * this.scene.game.canvas.height, 'speedline');
      this.speedlines[i].depth = -100;
    }
  }

  _createClass(_class, [{
    key: "update",
    value: function update() {
      for (var i = 0; i < this.speedlines.length; i++) {
        this.speedlines[i].y += 20;

        if (this.speedlines[i].y > this.scene.game.canvas.height + this.speedlines[i].height) {
          this.speedlines[i].x = Math.random() * this.scene.game.canvas.width;
          this.speedlines[i].y = Math.random() * this.scene.game.canvas.height;
          this.speedlines[i].setScale(1, Math.random() * 1.5 + 0.7);
        }
      }
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.image('speedline', 'assets/game/speedline.png');
    }
  }]);

  return _class;
}();

},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Entity(x, y, width, height) {
    _classCallCheck(this, Entity);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.active = true;
    this.hitboxes = [];
    this.addHitboxes();
  }

  _createClass(Entity, [{
    key: "addHitboxes",
    value: function addHitboxes() {
      // x, y relative to the entity's center
      this.hitboxes.push({
        x: -this.width / 2,
        y: -this.height / 2,
        width: this.width,
        height: this.height
      });
    }
  }, {
    key: "collidesWith",
    value: function collidesWith(entity) {
      var _this = this;

      var hitboxes1 = this.hitboxes;
      var hitboxes2 = entity.hitboxes;
      var r = false;
      hitboxes1.forEach(function (h1) {
        hitboxes2.forEach(function (h2) {
          var x1 = _this.x + h1.x;
          var y1 = _this.y + h1.y;
          var x2 = entity.x + h2.x;
          var y2 = entity.y + h2.y;

          if (x1 < x2 + h2.width && x1 + h1.width > x2 && y1 < y2 + h2.height && y1 + h1.height > y2) {
            r = true;
          }
        });
      });
      return r;
    }
  }, {
    key: "update",
    value: function update() {}
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {}
  }]);

  return Entity;
}();

},{}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Timer(scene) {
    _classCallCheck(this, Timer);

    this.scene = scene;
    this.frames = 0;
    this._stop = false;
    this.text = this.scene.add.text(this.scene.game.canvas.width - 41, 30, '', {
      fontFamily: 'Kong Text',
      fill: '#000',
      backgroundColor: 'rgba(255,255,255,0.5)'
    });
    this.text.setOrigin(1);
    this.text.depth = 1000;
    this.textMM = this.scene.add.text(this.scene.game.canvas.width - 5, 30, '.00', {
      fontFamily: 'Kong Text',
      fill: '#000',
      fontSize: '12px',
      backgroundColor: 'rgba(255,255,255,0.5)'
    });
    this.textMM.setOrigin(1);
    this.textMM.depth = 1000;
  }

  _createClass(Timer, [{
    key: "getHHMMSS",
    value: function getHHMMSS(frames) {
      frames = frames || this.frames;
      var s = frames / this.scene.game.loop.targetFps;
      var m = s / 60;
      s %= 60;
      var mm = (s - Math.floor(s)).toFixed(2).substr(1);
      s = Math.floor(s);
      var h = Math.floor(m / 60);
      m = Math.floor(m % 60);
      return {
        h: ('00' + h).slice(-2),
        m: ('00' + m).slice(-2),
        s: ('00' + s).slice(-2),
        mm: mm
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this._stop = true;
      this.text.alpha = 0.3;
      this.textMM.alpha = 0.3;
    }
  }, {
    key: "update",
    value: function update() {
      if (!this._stop) {
        this.frames++;

        var _this$getHHMMSS = this.getHHMMSS(),
            h = _this$getHHMMSS.h,
            m = _this$getHHMMSS.m,
            s = _this$getHHMMSS.s,
            mm = _this$getHHMMSS.mm;

        this.text.setText("".concat(h, ":").concat(m, ":").concat(s));
        this.textMM.setText(mm);
      }
    }
  }]);

  return Timer;
}();

},{}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../Entity');

var trapInBounds = require('../trapInBounds');

var Patterns = require('./Patterns');

var Radar = require('./projectiles/Radar');

var Orb = require('./projectiles/Orb');

var Missile = require('./projectiles/Missile');

var ProjectileContainer = require('./ProjectileContainer');

var Boss =
/*#__PURE__*/
function (_Entity) {
  _inherits(Boss, _Entity);

  function Boss(scene, x, y) {
    var _this;

    _classCallCheck(this, Boss);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Boss).call(this, x, y, 125, 110));
    _this.scene = scene;

    _this.scene.addObject('boss', _assertThisInitialized(_assertThisInitialized(_this))); // sound effects


    _this.fastSFX = _this.scene.sound.add('bossFast');
    _this.shakeSFX = _this.scene.sound.add('bossShake');
    _this.retreatSFX = _this.scene.sound.add('bossRetreat');
    _this.USweepSFX = _this.scene.sound.add('bossUSweep');
    _this.orbSFX = _this.scene.sound.add('bossOrb');
    _this.chargeSFX = _this.scene.sound.add('bossCharge');
    _this.chargedOrbSFX = _this.scene.sound.add('bossChargedOrb');
    _this.missileSFX = _this.scene.sound.add('bossMissile');
    _this.trackSFX = _this.scene.sound.add('bossTrack');
    _this.radarSFX = _this.scene.sound.add('bossRadar');

    _this.createAnimations();

    _this.patterns = new Patterns(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.sprite = _this.scene.add.sprite(_this.x, _this.y, 'boss');
    _this.spriteJetfire = _this.scene.add.sprite(_this.x, _this.y, 'boss_jetfire');

    _this.spriteJetfire.anims.play('boss_jetfire_animation');

    _this.numPatterns = 5;
    _this.chargedOrb = new ProjectileContainer(_assertThisInitialized(_assertThisInitialized(_this)), Orb, _this.numPatterns, 'charged');
    _this.linearRadialOrbs = new ProjectileContainer(_assertThisInitialized(_assertThisInitialized(_this)), Orb, 16 * 10 * _this.numPatterns, 'linear');
    _this.spiralOrbs = new ProjectileContainer(_assertThisInitialized(_assertThisInitialized(_this)), Orb, 16 * 10 * _this.numPatterns, 'spiral');
    _this.radars = new ProjectileContainer(_assertThisInitialized(_assertThisInitialized(_this)), Radar, _this.numPatterns);
    _this.twinMissiles = new ProjectileContainer(_assertThisInitialized(_assertThisInitialized(_this)), Missile, 2 * _this.numPatterns);
    ;
    _this.slowMissile = new ProjectileContainer(_assertThisInitialized(_assertThisInitialized(_this)), Missile, _this.numPatterns);
    ;
    return _this;
  }

  _createClass(Boss, [{
    key: "setRotation",
    value: function setRotation(deg) {
      this.sprite.angle = deg;
      this.spriteJetfire.angle = deg;
    }
  }, {
    key: "addHitboxes",
    value: function addHitboxes() {
      this.hitboxes.push({
        x: -30.5,
        y: -59,
        width: 65,
        height: 110
      }, {
        x: -59.5,
        y: -19,
        width: 123,
        height: 62
      }, {
        x: -70.5,
        y: 23,
        width: 145,
        height: 13
      });
    }
  }, {
    key: "createAnimations",
    value: function createAnimations() {
      Patterns.createAnimations(this.scene);
      this.scene.anims.create({
        key: 'boss_hit_animation',
        frames: this.scene.anims.generateFrameNumbers('boss', {
          start: 0,
          end: 2
        }),
        frameRate: 12,
        yoyo: true
      });
      this.scene.anims.create({
        key: 'boss_jetfire_animation',
        frames: this.scene.anims.generateFrameNumbers('boss_jetfire', {
          start: 0,
          end: 3
        }),
        frameRate: 8,
        repeat: -1
      });
    }
  }, {
    key: "random",
    value: function random() {
      // implement a deterministic random function
      return Math.random();
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations() {
      Patterns.removeAnimations(this.scene);
      this.scene.anims.remove('boss_hit_animation');
      this.scene.anims.remove('boss_jetfire_animation');
    }
  }, {
    key: "hit",
    value: function hit() {
      if (!this.sprite.anims.isPlaying) {
        this.sprite.anims.play('boss_hit_animation');
      }
    }
  }, {
    key: "updateSprite",
    value: function updateSprite() {
      this.spriteJetfire.visible = this.active;
      this.sprite.visible = this.active;
      this.spriteJetfire.x = this.x;
      this.spriteJetfire.y = this.y;
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }, {
    key: "updateProjectiles",
    value: function updateProjectiles() {
      this.radars.forEach(function (r) {
        return r.update();
      });
      this.linearRadialOrbs.forEach(function (r) {
        return r.update();
      });
      this.spiralOrbs.forEach(function (r) {
        return r.update();
      });
      this.chargedOrb.forEach(function (r) {
        return r.update();
      });
      this.twinMissiles.forEach(function (r) {
        return r.update();
      });
      this.slowMissile.forEach(function (r) {
        return r.update();
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.updateSprite();
      this.updateProjectiles();
      this.patterns.exec();
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      Patterns.loadAssets(scene);
      scene.load.spritesheet('boss', 'assets/game/boss/boss.png', {
        frameWidth: 214,
        frameHeight: 191
      });
      scene.load.spritesheet('boss_jetfire', 'assets/game/boss/jetfire.png', {
        frameWidth: 214,
        frameHeight: 191
      });
      scene.load.audio('bossFast', ['assets/audio/bossFast.mp3', 'assets/audio/bossFast.ogg']);
      scene.load.audio('bossShake', ['assets/audio/bossShake.mp3', 'assets/audio/bossShake.ogg']);
      scene.load.audio('bossRetreat', ['assets/audio/bossRetreat.mp3', 'assets/audio/bossRetreat.ogg']);
      scene.load.audio('bossUSweep', ['assets/audio/bossUSweep.mp3', 'assets/audio/bossUSweep.ogg']);
      scene.load.audio('bossOrb', ['assets/audio/bossOrb.mp3', 'assets/audio/bossOrb.ogg']);
      scene.load.audio('bossCharge', ['assets/audio/bossCharge.mp3', 'assets/audio/bossCharge.ogg']);
      scene.load.audio('bossChargedOrb', ['assets/audio/bossChargedOrb.mp3', 'assets/audio/bossChargedOrb.ogg']);
      scene.load.audio('bossMissile', ['assets/audio/bossMissile.mp3', 'assets/audio/bossMissile.ogg']);
      scene.load.audio('bossTrack', ['assets/audio/bossTrack.mp3', 'assets/audio/bossTrack.ogg']);
      scene.load.audio('bossRadar', ['assets/audio/bossRadar.mp3', 'assets/audio/bossRadar.ogg']);
    }
  }]);

  return Boss;
}(Entity);

trapInBounds(Boss);
module.exports = Boss;

},{"../Entity":3,"../trapInBounds":35,"./Patterns":20,"./ProjectileContainer":21,"./projectiles/Missile":22,"./projectiles/Orb":23,"./projectiles/Radar":24}],6:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(ChargedOrb, _Pattern);

  function ChargedOrb(boss) {
    _classCallCheck(this, ChargedOrb);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChargedOrb).call(this, boss));
  }

  _createClass(ChargedOrb, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var orb = this.boss.chargedOrb.get();

      if (orb && !orb.shoot) {
        orb.x = this.boss.x + 1;
        orb.y = this.boss.y + 58;
        this.boss.chargeSFX.play({
          delay: 0.1
        });
        orb.chargeAndShoot();
      }

      if (orb && orb.y >= this.boss.scene.game.canvas.height) {
        this.boss.patterns.finish();
        return defaultUpdate;
      }

      return function () {
        this.updateProjectiles();

        if (!orb || orb.shoot) {
          this.update = defaultUpdate;
          this.patterns.finish();
        } else {
          orb.x = this.x + 1;
          orb.y = this.y + 58;
        }
      };
    }
  }]);

  return ChargedOrb;
}(Pattern);

},{"./Pattern":9}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(FastMove, _Pattern);

  function FastMove(boss) {
    _classCallCheck(this, FastMove);

    return _possibleConstructorReturn(this, _getPrototypeOf(FastMove).call(this, boss));
  }

  _createClass(FastMove, [{
    key: "update",
    value: function update() {
      // shake for a moment, then quickly
      // move to a point within the upper
      // region of the screen
      var defaultUpdate = this._update;
      var move = false;
      var done = false;
      var x = this.boss.x;
      var y = this.boss.y;
      var i = 0;
      var minY = 65;
      var maxY = 385;
      var minX = 0;
      var maxX = this.boss.scene.game.canvas.width;
      var finX = this.boss.random() * (maxX - minX) + minX;
      var finY = this.boss.random() * (maxY - minY) + minY;
      var steps = 10;
      return function () {
        this.updateProjectiles();

        if (done) {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        }

        if (move) {
          if (i >= steps) {
            done = true;
          }

          this.x += (finX - x) / steps;
          this.y += (finY - y) / steps;
          this.updateSprite();
        } else {
          // shake animation
          if (i === 0) this.shakeSFX.play();

          if (i % 4 === 0) {
            this.x = x + Math.floor((this.random() > 0.5 ? 1 : -1) * this.random() * 10);
            this.y = y + Math.floor((this.random() > 0.5 ? 1 : -1) * this.random() * 10);
          }

          if ((i + 1) % 40 === 0) {
            this.x = x;
            this.y = y;
            move = true;
            i = 0;
            this.fastSFX.play();
          }

          this.updateSprite();
        }

        i++;
      };
    }
  }]);

  return FastMove;
}(Pattern);

},{"./Pattern":9}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(LinearRadialOrb, _Pattern);

  function LinearRadialOrb(boss) {
    _classCallCheck(this, LinearRadialOrb);

    return _possibleConstructorReturn(this, _getPrototypeOf(LinearRadialOrb).call(this, boss));
  }

  _createClass(LinearRadialOrb, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var i = 0;
      var orbClusters = 10;
      return function () {
        if (orbClusters <= 0) {
          this.update = defaultUpdate;
          this.patterns.finish();
        }

        if (i % 15 === 0 && orbClusters > 0) {
          var orbs = this.linearRadialOrbs.get(16);

          if (orbs) {
            this.orbSFX.play();
            var angleOffset = Math.PI * this.random();
            orbs.forEach(function (orb, i) {
              var angle = 2 * Math.PI / orbs.length * i + angleOffset;
              orb.angle = angle;
              orb.fire();
            });
          }

          orbClusters--;
        }

        this.updateProjectiles();
        i++;
      };
    }
  }]);

  return LinearRadialOrb;
}(Pattern);

},{"./Pattern":9}],9:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Pattern(boss) {
    _classCallCheck(this, Pattern);

    this.boss = boss;
    this._update = this.boss.update;
  }

  _createClass(Pattern, [{
    key: "update",
    value: function update() {}
  }, {
    key: "exec",
    value: function exec() {
      this.boss.update = this.update();
    }
  }]);

  return Pattern;
}();

},{}],10:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

var Radar = require('../projectiles/Radar');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(RadarAttack, _Pattern);

  function RadarAttack(boss) {
    _classCallCheck(this, RadarAttack);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadarAttack).call(this, boss));
  }

  _createClass(RadarAttack, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var radar = this.boss.radars.get();

      if (radar && !radar.start) {
        this.boss.radarSFX.play();
        radar.start = true;
        radar.x = this.boss.x;
        radar.y = this.boss.y;
      }

      var i = 0;
      return function () {
        if (i >= 30) {
          this.update = defaultUpdate;
          this.patterns.finish();
        }

        defaultUpdate.call(this);
        i++;
      };
    }
  }]);

  return RadarAttack;
}(Pattern);

},{"../projectiles/Radar":24,"./Pattern":9}],11:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(Retreat, _Pattern);

  function Retreat(boss) {
    _classCallCheck(this, Retreat);

    return _possibleConstructorReturn(this, _getPrototypeOf(Retreat).call(this, boss));
  }

  _createClass(Retreat, [{
    key: "update",
    value: function update() {
      // retreats to the top of the screen
      var defaultUpdate = this._update;
      var x = this.boss.x;
      var y = this.boss.y;
      var backX = this.boss.random() * this.boss.scene.game.canvas.width;
      var backY = 65;
      var i = 1;
      var steps = 10;
      this.boss.retreatSFX.play();
      return function () {
        if (i >= 50) {
          this.x = Math.round(backX);
          this.y = Math.round(backY);
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        }

        if (i % 5 === 0) {
          this.x += (backX - x) * Math.pow(2, -(i / 5));
          this.y += (backY - y) * Math.pow(2, -(i / 5));
        }

        defaultUpdate.call(this);
        i++;
      };
    }
  }]);

  return Retreat;
}(Pattern);

},{"./Pattern":9}],12:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(SineMove, _Pattern);

  function SineMove(boss) {
    _classCallCheck(this, SineMove);

    return _possibleConstructorReturn(this, _getPrototypeOf(SineMove).call(this, boss));
  }

  _createClass(SineMove, [{
    key: "update",
    value: function update() {
      // move in a wave towards the opposite
      // side of the screen
      var defaultUpdate = this._update;
      var gameWidth = this.boss.scene.game.canvas.width;
      var left = this.boss.x < gameWidth / 2;
      var x = this.boss.x;
      var y = this.boss.y;
      var finX = gameWidth * left + Math.pow(-1, left) * (this.boss.width / 2);
      var d = Math.abs(finX - x) / 2;
      var i = 0;
      return function () {
        this.x = x + Math.pow(-1, !left) * i * 2;
        this.y = y + 30 * Math.sin(i / 8);

        if (i >= d) {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        }

        defaultUpdate.call(this);
        i++;
      };
    }
  }]);

  return SineMove;
}(Pattern);

},{"./Pattern":9}],13:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(SlowMissile, _Pattern);

  function SlowMissile(boss) {
    _classCallCheck(this, SlowMissile);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlowMissile).call(this, boss));
  }

  _createClass(SlowMissile, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var missile = this.boss.slowMissile.get();

      if (missile) {
        this.boss.missileSFX.play();
        missile.active = true;
        missile.fired = true;
        missile.x = this.boss.x;
        missile.y = this.boss.y;
        missile.speed = 4;
      }

      var i = 0;
      return function () {
        defaultUpdate.call(this);

        if (i >= 30) {
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        }

        i++;
      };
    }
  }]);

  return SlowMissile;
}(Pattern);

},{"./Pattern":9}],14:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(SlowMove, _Pattern);

  function SlowMove(boss) {
    _classCallCheck(this, SlowMove);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlowMove).call(this, boss));
  }

  _createClass(SlowMove, [{
    key: "update",
    value: function update() {
      // move to a point within some radius
      var defaultUpdate = this._update;
      var rad = this.boss.random() * 2 * Math.PI;
      var radius = Math.floor(this.boss.random() * 75 + 50);
      var x = Math.cos(rad) * radius;
      var y = Math.sin(rad) * radius;
      var d = 1;
      var dunit = d;
      var m = Math.pow(Math.pow(d, 2) / (Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
      x *= m;
      y *= m;
      return function () {
        if (d > radius) {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        }

        this.x += x;
        this.y += y;
        defaultUpdate.call(this);
        d += dunit;
      };
    }
  }]);

  return SlowMove;
}(Pattern);

},{"./Pattern":9}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(SpiralOrb, _Pattern);

  function SpiralOrb(boss) {
    _classCallCheck(this, SpiralOrb);

    return _possibleConstructorReturn(this, _getPrototypeOf(SpiralOrb).call(this, boss));
  }

  _createClass(SpiralOrb, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var i = 0;
      var orbClusters = 10;
      return function () {
        if (orbClusters <= 0) {
          this.update = defaultUpdate;
          this.patterns.finish();
        }

        if (i % 15 === 0 && orbClusters > 0) {
          var orbs = this.spiralOrbs.get(16);

          if (orbs) {
            this.orbSFX.play();
            orbs.forEach(function (orb, i) {
              var angle = 2 * Math.PI / orbs.length * i;
              orb.angle = angle;
              orb.fire();
            });
          }

          orbClusters--;
        }

        this.updateProjectiles();
        i++;
      };
    }
  }]);

  return SpiralOrb;
}(Pattern);

},{"./Pattern":9}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

var teleport = require('../projectiles/Teleport');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(Teleport, _Pattern);

  function Teleport(boss) {
    var _this;

    _classCallCheck(this, Teleport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Teleport).call(this, boss));
    _this.teleport = new teleport(_this.boss);
    return _this;
  }

  _createClass(Teleport, [{
    key: "update",
    value: function update() {
      var teleport = this.teleport;
      var defaultUpdate = this._update;
      var moveBoss = false;
      var bossReappear = false;
      var done = false;
      var i = 0;
      this.teleport.active = true;
      this.teleport.sprite.anims.play('boss_teleport_animation');
      this.teleport.sprite.on('animationcomplete', function (animation, frame) {
        if (!this.anims._reverse) {
          moveBoss = true;
        }

        this.visible = false;
      }, this.teleport.sprite);
      return function () {
        this.updateProjectiles();

        if (done) {
          if (i >= 30) {
            this.update = defaultUpdate;
            this.patterns.finish();
          }

          i++;
          this.updateSprite();
          return;
        }

        if (moveBoss) {
          this.active = false;
          teleport.active = false; // teleport to edge of some set 
          // radius around player

          if (this.scene.objects.player) {
            // between 45 and 135 degrees above the x-axis
            var rad = this.random() * (Math.PI - 2 * Math.PI / 4) + Math.PI / 4;
            this.x = Math.floor(this.scene.objects.player[0].x + Math.cos(rad) * 200);
            this.y = Math.floor(this.scene.objects.player[0].y + (this.scene.objects.player[0].y < 200 ? 1 : -1) * Math.sin(rad) * 200);
          }

          defaultUpdate.call(this);
          moveBoss = false;
          bossReappear = true;
          return;
        }

        if (bossReappear) {
          teleport.SFX.play();
          teleport.active = true;
          this.active = true;
          teleport.sprite.anims.playReverse('boss_teleport_animation');
          bossReappear = false;
          done = true;
        }

        teleport.update();
      };
    }
  }]);

  return Teleport;
}(Pattern);

},{"../projectiles/Teleport":25,"./Pattern":9}],17:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(TrackTackle, _Pattern);

  function TrackTackle(boss) {
    var _this;

    _classCallCheck(this, TrackTackle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TrackTackle).call(this, boss));
    _this._hit = boss.hit;
    _this.graphics = boss.scene.add.graphics({
      lineStyle: {
        color: 0x555555,
        width: 5
      }
    });
    _this.graphics.depth = -5;
    return _this;
  }

  _createClass(TrackTackle, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var defaultHit = this._hit;
      var hits = 0;
      var graphics = this.graphics;
      var player = this.boss.scene.objects.player;

      if (!player) {
        this.boss.patterns.finish();
        return defaultUpdate;
      }

      player = player[0];

      this.boss.hit = function () {
        defaultHit.call(this);
        hits++;
      };

      var tackle = false;
      var done = false;
      var i = 0;
      var travelled = 0;
      var speed = 20;
      var initX = this.boss.x;
      var initY = this.boss.y;
      var vX, vY;
      var x1, x2, y1, y2;
      var m, d;
      this.boss.trackSFX.play();
      return function () {
        graphics.clear();

        if (done) {
          this.hit = defaultHit;
          this.update = defaultUpdate;
          this.patterns.finish();
          this.sprite.tint = undefined;
          return;
        }

        if (i > 60 && !tackle) {
          tackle = true;
          this.fastSFX.play();
        }

        var hex = parseInt((i % 16 + '').repeat(6), 16);
        this.sprite.tint = hex;

        if (tackle) {
          var finX = initX + m * vX;
          var finY = initY + m * vY;
          travelled += speed;
          m = Math.pow(Math.pow(speed, 2) / (Math.pow(vX, 2) + Math.pow(vY, 2)), 0.5);
          this.x += m * vX;
          this.y += m * vY;

          if (travelled >= d) {
            done = true;
          }
        } else {
          x1 = this.x + 2;
          y1 = this.y + 55;
          vX = player.x - x1;
          vY = player.y - y1;
          m = Math.max(1 - hits / 12, 0.25);
          x2 = x1 + m * vX;
          y2 = y1 + m * vY;
          vX = player.x - initX;
          vY = player.y - initY;
          d = Math.pow(Math.pow(m * vX, 2) + Math.pow(m * vY, 2), 0.5);
          graphics.beginPath();
          graphics.moveTo(x1, y1);
          graphics.lineTo(x2, y2);
          graphics.closePath();
          graphics.strokePath();
        }

        defaultUpdate.call(this);
        i++;
      };
    }
  }]);

  return TrackTackle;
}(Pattern);

},{"./Pattern":9}],18:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(TwinMissiles, _Pattern);

  function TwinMissiles(boss) {
    _classCallCheck(this, TwinMissiles);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwinMissiles).call(this, boss));
  }

  _createClass(TwinMissiles, [{
    key: "update",
    value: function update() {
      var _this = this;

      var defaultUpdate = this._update;
      var missiles = this.boss.twinMissiles.get(2);
      var m1, m2;

      if (missiles) {
        missiles.forEach(function (m) {
          m.active = true;
          m.x = _this.boss.x;
          m.y = _this.boss.y;
        });
        m1 = missiles[0];
        m2 = missiles[1];
      }

      var i = 0;
      return function () {
        defaultUpdate.call(this);

        if (i >= 30 || !missiles) {
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        } else if (i === 25) {
          this.missileSFX.play();
          m1.fired = true;
          m2.fired = true;
          m1.speed = m2.speed;
        } else {
          m1.x -= 2;
          m1.y -= 2;
          m2.x += 2;
          m2.y = m1.y;
        }

        i++;
      };
    }
  }]);

  return TwinMissiles;
}(Pattern);

},{"./Pattern":9}],19:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pattern = require('./Pattern');

module.exports =
/*#__PURE__*/
function (_Pattern) {
  _inherits(USweep, _Pattern);

  function USweep(boss) {
    _classCallCheck(this, USweep);

    return _possibleConstructorReturn(this, _getPrototypeOf(USweep).call(this, boss));
  }

  _createClass(USweep, [{
    key: "update",
    value: function update() {
      var defaultUpdate = this._update;
      var done = false;
      var step = 0;
      var slowSpeed = 10;
      var fastSpeed = 40;
      var defaultHitbox = this.boss.hitboxes;
      var hitbox = [{
        x: -this.boss.width / 2,
        y: -this.boss.height / 2,
        width: this.boss.width,
        height: this.boss.height
      }];
      var minY = 235;
      return function () {
        if (done) {
          this.update = defaultUpdate;
          this.patterns.finish();
          return;
        }

        switch (step) {
          case 0:
            if (this.y > minY) {
              step++;
            } else {
              done = true;
            }

            break;

          case 1:
            // go up out of screen
            if (this.y > -this.height) {
              this.y -= slowSpeed;
            } else {
              this.hitboxes = hitbox;
              this.y = -fastSpeed;
              this.x = this.scene.game.canvas.width - this.width / 2;
              step++;
              this.USweepSFX.play();
            }

            break;

          case 2:
            // go down out to bottom of screen
            this.y += fastSpeed;

            if (this.y >= this.scene.game.canvas.height - fastSpeed) {
              this.y = this.scene.game.canvas.height - this.height / 2;
              step++;
            }

            break;

          case 3:
            // go left to side of screen
            this.x -= fastSpeed;

            if (this.x <= this.width / 2) {
              step++;
            }

            this.setRotation(90);
            break;

          case 4:
            // go up out of screen
            this.y -= fastSpeed;

            if (this.y <= -this.height) {
              this.x = this.scene.game.canvas.width / 2;
              this.hitboxes = defaultHitbox;
              step++;
            }

            this.setRotation(180);
            break;

          case 5:
            // ease into 1/4 from the the top of the screen
            if (this.y < this.scene.game.canvas.height / 4) {
              this.y += slowSpeed;
            } else {
              done = true;
            }

            this.setRotation(0);
            break;
        }

        this.updateSprite();
        this.updateProjectiles();
      };
    }
  }]);

  return USweep;
}(Pattern);

},{"./Pattern":9}],20:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Missile = require('../projectiles/Missile');

var Orb = require('../projectiles/Orb');

var Radar = require('../projectiles/Radar');

var Teleport = require('../projectiles/Teleport'); // Patterns
// movement patterns


var Teleport2Player = require('./Teleport');

var SlowMove = require('./SlowMove');

var FastMove = require('./FastMove');

var Retreat = require('./Retreat');

var SineMove = require('./SineMove'); // tackle patterns


var USweep = require('./USweep');

var TrackTackle = require('./TrackTackle'); // projectile patterns


var LinearRadialOrb = require('./LinearRadialOrb');

var SpiralOrb = require('./SpiralOrb');

var ChargedOrb = require('./ChargedOrb');

var RadarAttack = require('./RadarAttack');

var SlowMissile = require('./SlowMissile');

var TwinMissiles = require('./TwinMissiles');

module.exports =
/*#__PURE__*/
function () {
  function Patterns(boss) {
    _classCallCheck(this, Patterns);

    this.boss = boss;
    this.canExec = true;
    this.patterns = [new SlowMove(this.boss), new SineMove(this.boss), new FastMove(this.boss), new ChargedOrb(this.boss), new Teleport2Player(this.boss), new LinearRadialOrb(this.boss), new SpiralOrb(this.boss), new TwinMissiles(this.boss), new USweep(this.boss), new TrackTackle(this.boss), new Retreat(this.boss), new SlowMissile(this.boss), new RadarAttack(this.boss)]; // probabilities

    this.p = Array(this.patterns.length).fill(1 / this.patterns.length);
    this.n30s = 0;
  }

  _createClass(Patterns, [{
    key: "finish",
    value: function finish() {
      this.canExec = true;
    }
  }, {
    key: "adjustProbabilities",
    value: function adjustProbabilities() {
      var _this = this;

      var n30s = Math.floor(this.boss.scene.timer.frames / this.boss.scene.game.loop.targetFps / 30);

      if (n30s > this.n30s) {
        // adjust the probabilities
        this.p.forEach(function (p, i) {
          switch (_this.patterns[i].constructor.name) {
            case SlowMove.name:
            case SineMove.name:
              if (p > 0.01) {
                _this.increaseProbability(i, -0.1, RadarAttack.name);
              }

              break;

            case FastMove.name:
              if (p < 1 / 12) {
                _this.increaseProbability(i, 0.05);
              }

              break;

            case ChargedOrb.name:
              if (p > 0.02) {
                _this.increaseProbability(i, -0.05);
              }

              break;

            case Teleport2Player.name:
              if (p < 1 / 6) {
                _this.increaseProbability(i, 0.1);
              }

              break;

            case LinearRadialOrb.name:
            case SpiralOrb.name:
              if (p > 0.05) {
                _this.increaseProbability(i, -0.01);
              }

              break;

            case TwinMissiles.name:
              break;

            case USweep.name:
              break;

            case TrackTackle.name:
              break;

            case Retreat.name:
              break;

            case SlowMissile.name:
              if (p < 1 / 4) {
                _this.increaseProbability(i, 0.1);
              }

              break;

            case RadarAttack.name:
              if (p < 1 / 4) {
                _this.increaseProbability(i, 0.1);
              }

              break;
          }
        });
        this.n30s = n30s;
      }
    }
  }, {
    key: "increaseProbability",
    value: function increaseProbability(i, m) {
      var _this2 = this;

      var distribute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'all';
      var amount = this.p[i] * m;
      this.p[i] += amount;
      this.patterns.forEach(function (p, index) {
        if (distribute === 'all') {
          var a = amount / _this2.p.length;

          if (p.constructor.name !== _this2.p[i].constructor.name) {
            _this2.p[index] -= a;

            if (_this2.p[index] < 0) {
              _this2.p[i] += Math.abs(_this2.p[index]);
              _this2.p[index] = 0;
            }
          }
        } else if (p.constructor.name === distribute) {
          _this2.p[index] -= amount;
        }
      });
    }
  }, {
    key: "_getRandomIndex",
    value: function _getRandomIndex() {
      var random = this.boss.random();
      var index = this.patterns.length - 1;
      var p = 0;
      this.p.some(function (prob, i) {
        if (random < prob) {
          index = i;
          return true;
        }

        random -= prob;
      });
      return index;
    }
  }, {
    key: "exec",
    value: function exec() {
      this.adjustProbabilities();

      if (this.canExec) {
        this.canExec = false;

        var rn = this._getRandomIndex();

        this.patterns[rn].exec();
      }
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      Missile.loadAssets(scene);
      Orb.loadAssets(scene);
      Teleport.loadAssets(scene);
    }
  }, {
    key: "createAnimations",
    value: function createAnimations(scene) {
      Missile.createAnimations(scene);
      Orb.createAnimations(scene);
      Teleport.createAnimations(scene);
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations(scene) {
      Missile.removeAnimations(scene);
      Orb.removeAnimations(scene);
      Teleport.removeAnimations(scene);
    }
  }]);

  return Patterns;
}();

},{"../projectiles/Missile":22,"../projectiles/Orb":23,"../projectiles/Radar":24,"../projectiles/Teleport":25,"./ChargedOrb":6,"./FastMove":7,"./LinearRadialOrb":8,"./RadarAttack":10,"./Retreat":11,"./SineMove":12,"./SlowMissile":13,"./SlowMove":14,"./SpiralOrb":15,"./Teleport":16,"./TrackTackle":17,"./TwinMissiles":18,"./USweep":19}],21:[function(require,module,exports){
"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function ProjectileContainer(boss, projectile, n) {
    _classCallCheck(this, ProjectileContainer);

    this.projectiles = [];
    this.availableProjectiles = [];

    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    for (var i = 0; i < n; i++) {
      var p = _construct(projectile, [boss].concat(args));

      p.addContainer(this);
      this.projectiles.push(p);
      this.availableProjectiles.push(p);
    }
  }

  _createClass(ProjectileContainer, [{
    key: "get",
    value: function get() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this.availableProjectiles.length === 0) return false;
      if (n === 0) return this.availableProjectiles.pop();
      if (this.availableProjectiles.length < n) return false;
      var result = [];

      for (var i = 0; i < n; i++) {
        result.push(this.availableProjectiles.pop());
      }

      return result;
    }
  }, {
    key: "reload",
    value: function reload(projectile) {
      this.availableProjectiles.push(projectile);
    }
  }, {
    key: "forEach",
    value: function forEach(cb) {
      return this.projectiles.forEach(cb);
    }
  }]);

  return ProjectileContainer;
}();

},{}],22:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(Missile, _Entity);

  function Missile(boss) {
    var _this;

    _classCallCheck(this, Missile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Missile).call(this, boss.x, boss.y, 11, 55));
    _this.boss = boss;

    _this.boss.scene.addObject('boss_missile', _assertThisInitialized(_assertThisInitialized(_this)));

    _this.active = false;
    _this.fired = false;

    _this.setSpeed();

    _this.sprite = _this.boss.scene.add.sprite(_this.x, _this.y, 'boss_missile');
    _this.spriteFire = _this.boss.scene.add.sprite(_this.x, _this.y, 'boss_missile_fire');

    _this.spriteFire.play('boss_missile_fire_animation');

    _this.sprite.depth = -1;
    _this.spriteFire.depth = -1;
    _this.container = [];
    return _this;
  }

  _createClass(Missile, [{
    key: "addContainer",
    value: function addContainer(container) {
      this.container.push(container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.reload();
      this.active = false;
      this.fired = false;
      this.y = 0;
    }
  }, {
    key: "reload",
    value: function reload() {
      for (var i = 0; i < this.container.length; i++) {
        this.container[i].reload(this);
      }
    }
  }, {
    key: "setSpeed",
    value: function setSpeed() {
      this.speed = this.boss.random() * 10 + 10;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.fired) {
        this.y += this.speed;

        if (this.y >= this.boss.scene.game.canvas.height + this.height) {
          this.destroy();
        }
      }

      this.sprite.x = this.x;
      this.sprite.y = this.y;
      this.spriteFire.x = this.x;
      this.spriteFire.y = this.y - 38;
      this.sprite.visible = this.active;
      this.spriteFire.visible = this.active;
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.image('boss_missile', 'assets/game/boss/missile.png');
      scene.load.spritesheet('boss_missile_fire', 'assets/game/boss/missile_fire.png', {
        frameWidth: 38,
        frameHeight: 140
      });
    }
  }, {
    key: "createAnimations",
    value: function createAnimations(scene) {
      scene.anims.create({
        key: 'boss_missile_fire_animation',
        frames: scene.anims.generateFrameNumbers('boss_missile_fire', {
          start: 0,
          end: 3
        }),
        frameRate: 8,
        repeat: -1
      });
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations(scene) {
      scene.anims.remove('boss_missile_fire_animation');
    }
  }]);

  return Missile;
}(Entity);

},{"../../Entity":3}],23:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(Orb, _Entity);

  function Orb(boss, type) {
    var _this;

    _classCallCheck(this, Orb);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Orb).call(this, boss.x, boss.y, 6, 6));
    _this.boss = boss;

    _this.boss.scene.addObject('boss_orb', _assertThisInitialized(_assertThisInitialized(_this)));

    _this.type = type;
    _this.active = false;
    _this.shoot = false;
    _this.angle = 0;
    _this.y += 80;
    _this.sprite = _this.boss.scene.add.sprite(_this.x, _this.y, 'boss_orb');

    _this.sprite.on('animationcomplete', function () {
      _this.boss.chargedOrbSFX.play();

      _this.shoot = true;
      _this.finalX = (_this.boss.scene.objects.player[0].x - _this.x) / 15;
      _this.finalY = (_this.boss.scene.objects.player[0].y - _this.y) / 15;
    }, _this.scene);

    _this.container = [];
    return _this;
  }

  _createClass(Orb, [{
    key: "addContainer",
    value: function addContainer(container) {
      this.container.push(container);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.active = false;
    }
  }, {
    key: "chargeAndShoot",
    value: function chargeAndShoot() {
      this.active = true;
      this.sprite.anims.play('boss_charge_orb');
    }
  }, {
    key: "fire",
    value: function fire() {
      this.active = true;
      this.x = Math.floor(this.boss.x + 100 * Math.cos(this.angle));
      this.y = Math.floor(this.boss.y + 100 * Math.sin(this.angle));
      this.shoot = true;
    }
  }, {
    key: "updateHitbox",
    value: function updateHitbox() {
      var hitbox = this.hitboxes[0];
      var width, height;

      switch (this.sprite.frame.name) {
        case 0:
          width = 6;
          height = 6;
          break;

        case 1:
          width = 9;
          height = 9;
          break;

        case 2:
          width = 12;
          height = 12;
          break;

        case 3:
          width = 16;
          height = 16;
          break;

        case 4:
          width = 20;
          height = 20;
          break;

        case 5:
          width = 25;
          height = 25;
          break;
      }

      hitbox.x = -width / 2;
      hitbox.y = -height / 2;
      hitbox.width = width;
      hitbox.height = height;
    }
  }, {
    key: "update",
    value: function update() {
      if ((this.y < 0 || this.y >= this.boss.scene.game.canvas.height || this.x >= this.boss.scene.game.canvas.width || this.x < 0) && this.active) {
        this.shoot = false;
        this.active = false;
        this.sprite.setFrame(0);

        for (var i = 0; i < this.container.length; i++) {
          this.container[i].reload(this);
        }
      } else if (this.shoot) {
        if (this.type === 'charged') {
          if (this.sprite.frame.name === 5) {
            this.x += this.finalX;
            this.y += this.finalY;
          } else {
            this.destroy();
          }
        } else if (this.type === 'linear') {
          this.sprite.setFrame(1);
          this.x = Math.floor(this.x + 2.5 * Math.cos(this.angle));
          this.y = Math.floor(this.y + 2.5 * Math.sin(this.angle));
        } else if (this.type === 'spiral') {
          this.sprite.setFrame(2);
          this.angle += (this.boss.x % 2 === 0 ? 1 : -1) * 0.01;
          this.x = Math.floor(this.x + 3 * Math.cos(this.angle));
          this.y = Math.floor(this.y + 3 * Math.sin(this.angle));
        }
      }

      this.updateHitbox();
      this.sprite.x = this.x;
      this.sprite.y = this.y;
      this.sprite.visible = this.active;
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.spritesheet('boss_orb', 'assets/game/boss/orb.png', {
        frameWidth: 56,
        frameHeight: 56
      });
    }
  }, {
    key: "createAnimations",
    value: function createAnimations(scene) {
      scene.anims.create({
        key: 'boss_charge_orb',
        frames: scene.anims.generateFrameNumbers('boss_orb', {
          start: 0,
          end: 5
        }),
        frameRate: 5
      });
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations(scene) {
      scene.anims.remove('boss_charge_orb');
    }
  }]);

  return Orb;
}(Entity);

},{"../../Entity":3}],24:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(Radar, _Entity);

  function Radar(boss) {
    var _this;

    _classCallCheck(this, Radar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Radar).call(this, boss.x, boss.y, 7, 7));
    _this.boss = boss;

    _this.boss.scene.addObject('boss_radar', _assertThisInitialized(_assertThisInitialized(_this)));

    _this.speed = 3;
    _this.active = false;
    _this.start = false;
    _this.graphics = _this.boss.scene.add.graphics({
      lineStyle: {
        color: 0,
        width: 7
      }
    });
    _this.graphics.depth = -5;
    _this.radius = 0;
    _this.i = 0;
    _this.interval = 60;
    _this.container = [];
    return _this;
  }

  _createClass(Radar, [{
    key: "addContainer",
    value: function addContainer(container) {
      this.container.push(container);
    }
  }, {
    key: "addHitboxes",
    value: function addHitboxes() {}
  }, {
    key: "changeHitboxes",
    value: function changeHitboxes() {
      this.hitboxes.length = 0;
      var r = this.radius;
      var pi = Math.PI;
      var numHitboxes = Math.round(Math.pow(pi * (r + this.width), 2) - Math.pow(pi * r, 2)) / (this.width * this.height * 4);
      var radPerHitbox = pi / numHitboxes * 2;

      for (var i = 0; i < numHitboxes; i++) {
        var x = -(this.radius * Math.cos(radPerHitbox * i) + this.width / 2);
        var y = -(this.radius * Math.sin(radPerHitbox * i) + this.width / 2);

        if (this.x + x >= 0 && this.x + x <= this.boss.scene.game.canvas.width && this.y + y >= 0 && this.y + y <= this.boss.scene.game.canvas.height) {
          this.hitboxes.push({
            x: x,
            y: y,
            width: this.width,
            height: this.height
          });
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.active = false;
      this.graphics.clear();
      this.stop();
    }
  }, {
    key: "stop",
    value: function stop() {
      for (var i = 0; i < this.container.length; i++) {
        this.container[i].reload(this);
      }

      this.start = false;
      this.radius = 0;
      this.speed = this.boss.random() * 4 + 1;
      this.i = this.boss.random() * 60 + 60;
    }
  }, {
    key: "update",
    value: function update() {
      this.graphics.clear();

      if (this.start) {
        this.graphics.strokeCircle(this.x, this.y, this.radius);
        var alpha = this.i % this.interval / this.interval;

        if (alpha >= 0.6) {
          this.active = true;
          this.graphics.alpha = 1;
        } else {
          this.active = false;
          this.graphics.alpha = 0.2;
        }

        this.i++;
        this.changeHitboxes();

        if (this.radius <= 700) {
          this.radius += this.speed;
        } else {
          this.stop();
          return true;
        }
      }
    }
  }]);

  return Radar;
}(Entity);

},{"../../Entity":3}],25:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Entity = require('../../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(Teleport, _Entity);

  function Teleport(boss) {
    var _this;

    _classCallCheck(this, Teleport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Teleport).call(this, boss.x, boss.y));
    _this.boss = boss;
    _this.active = false;
    _this.sprite = _this.boss.scene.add.sprite(_this.x, _this.y, 'boss_teleport');
    _this.sprite.visible = _this.active;
    _this.SFX = _this.boss.scene.sound.add('bossTeleport');
    return _this;
  }

  _createClass(Teleport, [{
    key: "update",
    value: function update() {
      this.sprite.visible = this.active;
      this.x = this.boss.x;
      this.y = this.boss.y;
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.spritesheet('boss_teleport', 'assets/game/boss/teleport.png', {
        frameWidth: 214,
        frameHeight: 191
      });
      scene.load.audio('bossTeleport', ['assets/audio/bossTeleport.mp3', 'assets/audio/bossTeleport.ogg']);
    }
  }, {
    key: "createAnimations",
    value: function createAnimations(scene) {
      scene.anims.create({
        key: 'boss_teleport_animation',
        frames: scene.anims.generateFrameNumbers('boss_teleport', {
          start: 0,
          end: 2
        }),
        frameRate: 8
      });
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations(scene) {
      scene.anims.remove('boss_teleport_animation');
    }
  }]);

  return Teleport;
}(Entity);

},{"../../Entity":3}],26:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(Bullet, _Entity);

  function Bullet(player) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, player.x + 1, player.y - 10, 5, 20));
    _this.player = player;

    _this.player.scene.addObject('player_bullet', _assertThisInitialized(_assertThisInitialized(_this)));

    _this.speed = 20;
    _this.active = false;
    _this.sprite = _this.player.scene.add.sprite(_this.x, _this.y, 'player_bullet');
    _this.sprite.depth = -1;
    _this.bulletContainers = [];
    return _this;
  }

  _createClass(Bullet, [{
    key: "addBulletContainer",
    value: function addBulletContainer(bulletContainer) {
      this.bulletContainers.push(bulletContainer);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.active = false;

      for (var i = 0; i < this.bulletContainers.length; i++) {
        this.bulletContainers[i].reload(this);
      }
    }
  }, {
    key: "fire",
    value: function fire() {
      if (!this.active) {
        this.x = Math.floor(this.player.x + 1);
        this.y = Math.floor(this.player.y - 10);
        this.active = true;
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.y <= -this.sprite.height && this.active) {
        this.unload();
      }

      if (this.active) {
        this.y -= this.speed;
      }

      this.sprite.x = this.x;
      this.sprite.y = this.y;
      this.sprite.visible = this.active; // gain meter when bullet hits boss

      if (this.player.scene.objects.boss && this.collidesWith(this.player.scene.objects.boss[0]) && this.active) {
        this.player.scene.objects.boss[0].hit();

        if (this.player.shieldActive) {
          this.player.meter.gainMeter(0.3);
        } else {
          this.player.meter.gainMeter(0.8);
        }

        this.unload();
      }
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.image('player_bullet', 'assets/game/player/bullet.png');
    }
  }]);

  return Bullet;
}(Entity);

},{"../Entity":3}],27:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bullet = require('./Bullet');

module.exports =
/*#__PURE__*/
function () {
  function _class(bullets, player) {
    _classCallCheck(this, _class);

    this.bullets = [];
    this.availableBullets = [];

    for (var i = 0; i < bullets; i++) {
      var bullet = new Bullet(player);
      bullet.addBulletContainer(this);
      this.bullets.push(bullet);
      this.availableBullets.push(bullet);
    }
  }

  _createClass(_class, [{
    key: "reload",
    value: function reload(bullet) {
      this.availableBullets.push(bullet);
    }
  }, {
    key: "fire",
    value: function fire() {
      if (this.availableBullets.length === 0) return false;
      var bullet = this.availableBullets.pop();
      bullet.fire();
      return true;
    }
  }, {
    key: "update",
    value: function update() {
      for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update();
      }
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      Bullet.loadAssets(scene);
    }
  }]);

  return _class;
}();

},{"./Bullet":26}],28:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(ClearRadius, _Entity);

  function ClearRadius(player) {
    var _this;

    _classCallCheck(this, ClearRadius);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClearRadius).call(this, player.x, player.y));
    _this.player = player;

    _this.player.scene.addObject('player_special', _assertThisInitialized(_assertThisInitialized(_this)));

    _this.active = false;

    _this.createAnimations();

    _this.sprite = _this.player.scene.add.sprite(_this.x, _this.y, 'player_special');

    _this.sprite.play('player_special');

    _this.sprite.on('animationcomplete', function () {
      _this.active = false;
    });

    _this.sprite.depth = 50;
    return _this;
  }

  _createClass(ClearRadius, [{
    key: "addHitboxes",
    value: function addHitboxes() {
      this.radius = 150;
      var r = this.radius; // large inner square

      var w = Math.pow(Math.pow(2 * r, 2) / 2, 0.5); // diameter tall rectangles

      var rw = r / 5 * 4;
      this.hitboxes.push({
        // square
        x: -w / 2,
        y: -w / 2,
        width: w,
        height: w
      }, {
        // diameter wide
        x: -r,
        y: -rw / 2,
        width: 2 * r,
        height: rw
      }, {
        // diameter long
        x: -rw / 2,
        y: -r,
        width: rw,
        height: 2 * r
      });
      var sq = this.hitboxes[0];
      var rwide = this.hitboxes[1];
      var rlong = this.hitboxes[2];
      this.hitboxes.push({
        x: (sq.x + rwide.x) / 2,
        y: (sq.y + rwide.y) / 2,
        width: (sq.width + rwide.width) / 2,
        height: (sq.height + rwide.height) / 2
      }, {
        x: (sq.x + rlong.x) / 2,
        y: (sq.y + rlong.y) / 2,
        width: (sq.width + rlong.width) / 2,
        height: (sq.height + rlong.height) / 2
      });
    }
  }, {
    key: "createAnimations",
    value: function createAnimations() {
      this.player.scene.anims.create({
        key: 'player_special',
        frames: this.player.scene.anims.generateFrameNumbers('player_special', {
          start: 0,
          end: 6
        }),
        frameRate: 5
      });
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations() {
      this.player.scene.anims.remove('player_special');
    }
  }, {
    key: "use",
    value: function use() {
      this.player.specialSFX.play();
      this.x = this.player.x;
      this.y = this.player.y;
      this.active = true;
      this.sprite.play('player_special');
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      this.sprite.x = this.x;
      this.sprite.y = this.y;
      this.sprite.visible = this.active;

      for (var key in this.player.scene.objects) {
        if (key.startsWith('boss_')) {
          this.player.scene.objects[key].forEach(function (obj) {
            if (_this2.collidesWith(obj) && _this2.active) {
              // TODO remove enemy projectiles from screen
              obj.destroy();
            }
          });
        }
      }
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.spritesheet('player_special', 'assets/game/player/special.png', {
        frameWidth: 300,
        frameHeight: 300
      });
    }
  }]);

  return ClearRadius;
}(Entity);

},{"../Entity":3}],29:[function(require,module,exports){
"use strict";

var _require = require('../../utils'),
    decorate = _require.decorate;

module.exports = function (player) {
  var holdingShoot = 0;
  var dashActiveInit = 20;
  var dashActive = dashActiveInit;
  var delayInit = 3;
  var delay = delayInit;
  var timers = [];
  var dirBits = 0;
  var up = 8;
  var down = 4;
  var left = 2;
  var right = 1;

  function setAfterImagePosition(img) {
    img.x = this.x;
    img.y = this.y;
    img.visible = true;
  }

  player.prototype.update = decorate(player.prototype.update, function () {
    var _this = this;

    if (this.isDashing) {
      // clean up after exiting dash state
      if (dashActive <= 0 || this.scene.game.controller.pressingButton('shoot') && !this.scene.game.controller.pressingButton('shield')) {
        this.isDashing = false;
        dashActive = dashActiveInit;
      }

      dashActive--;

      if ((dirBits & up) === up) {
        this.y -= this.speed * (1 + dashActive / dashActiveInit);
      }

      if ((dirBits & down) === down) {
        this.y += this.speed * (1 + dashActive / dashActiveInit);
      }

      if ((dirBits & left) === left) {
        this.x -= this.speed * (1 + dashActive / dashActiveInit);
      }

      if ((dirBits & right) === right) {
        this.x += this.speed * (1 + dashActive / dashActiveInit);
      } // cosmetic dash afterimage effect


      if (delay) {
        delay--;
      } else {
        this.spriteAfterImages.forEach(function (img, i) {
          var img2;

          if (i === 0) {
            img2 = _this;
          } else {
            img2 = _this.spriteAfterImages[i - 1];
          }

          timers.push(_this.scene.time.addEvent({
            delay: i * 180,
            callback: setAfterImagePosition,
            args: [img],
            callbackScope: img2
          }));
        });
        delay = delayInit;
      }
    } else {
      this.spriteAfterImages.forEach(function (img) {
        img.visible = false;
        img.x = _this.x;
        img.y = _this.y;
      });
    }

    if (this.scene.game.controller.pressingButton('shoot')) {
      holdingShoot++;

      if (this.scene.game.controller.pressingButton('shield') && !this.scene.game.controller.buttonHeld('shield') && holdingShoot <= 3) {
        if (!this.isDashing) {
          dirBits = 0;
          dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('up');
          dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('down');
          dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('left');
          dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('right');

          if (dirBits !== 0) {
            this.dashSFX.play();
            this.isDashing = true;
          }
        }
      }
    } else {
      holdingShoot = 0;
    }
  });
};

},{"../../utils":39}],30:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Entity = require('../Entity');

module.exports =
/*#__PURE__*/
function (_Entity) {
  _inherits(_class, _Entity);

  function _class() {
    var _this;

    var meter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var scene = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, _class);

    /*
    	meter: percentage of meter to start with
    */
    _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, 15, 13));
    _this.meterMax = 1000;
    _this.meter = Math.min(Math.max(meter / 100.0 * _this.meterMax, 0), _this.meterMax) || 0;
    _this.scene = scene; // graphics

    _this.barWidth = 144;

    var meterBg = _this.scene.add.sprite(_this.x + 69, _this.y + 12, 'meter', 1);

    meterBg.depth = 99;

    var meterOverlay = _this.scene.add.sprite(_this.x + 69, _this.y + 12, 'meter', 0);

    meterOverlay.depth = 101;
    _this.graphics = _this.scene.add.graphics({
      fillStyle: {
        color: _this.getMeterColor()
      }
    });
    _this.graphics.depth = 100;
    _this.meterBarHeight = 14;

    _this.graphics.fillRect(_this.x, _this.y, _this.meter / _this.meterMax * _this.barWidth, _this.meterBarHeight);

    return _this;
  }

  _createClass(_class, [{
    key: "useBars",
    value: function useBars(bars) {
      bars = Math.round(bars);
      if (bars > 4 || bars < 1 || bars === NaN) return false;
      var bar = this.meterMax / 4.0;
      bars = bar * bars;

      if (this.meter >= bars) {
        this.meter -= bars;
        return true;
      }

      return false;
    }
  }, {
    key: "gainMeter",
    value: function gainMeter(percent) {
      this.meter = Math.min(this.meter += this.meterMax * (percent / 100.0), this.meterMax);
      this.meter = Math.max(0, this.meter);
    }
  }, {
    key: "getMeterColor",
    value: function getMeterColor() {
      var meterPercent = this.meter / this.meterMax;

      if (meterPercent >= 1.0) {
        return 0xeadf00; // yellow
      } else if (meterPercent >= 0.75) {
        return 0xe00000; // red
      } else if (meterPercent >= 0.50) {
        return 0xff6600; // orange
      } else if (meterPercent >= 0.25) {
        return 0x00c000; // green
      } else {
        return 0x4c4ccc; // blue
      }
    }
  }, {
    key: "update",
    value: function update() {
      // update graphics
      this.graphics.clear();
      this.graphics.fillStyle(this.getMeterColor());
      this.graphics.fillRect(this.x, this.y, this.meter / this.meterMax * this.barWidth, this.meterBarHeight);
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.spritesheet('meter', 'assets/game/player/meter.png', {
        frameWidth: 151,
        frameHeight: 23
      });
    }
  }]);

  return _class;
}(Entity);

},{"../Entity":3}],31:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Entity = require('../Entity');

var trapInBounds = require('../trapInBounds');

var Meter = require('./Meter');

var ClearRadius = require('./ClearRadius');

var BulletContainer = require('./BulletContainer');

var addDash = require('./Dash');

var addShoot = require('./Shoot');

var addShield = require('./Shield');

var addSpecials = require('./Specials');

var Player =
/*#__PURE__*/
function (_Entity) {
  _inherits(Player, _Entity);

  function Player(scene, x, y) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, x, y, 9, 9));
    _this.scene = scene;

    _this.scene.addObject('player', _assertThisInitialized(_assertThisInitialized(_this)));

    _this.createAnimations();

    _this.listenKeystrokes();

    _this.speed = 3;
    _this.isDashing = false;
    _this.sprite = _this.scene.add.sprite(_this.x, _this.y, 'player');
    _this.spriteAfterImages = [scene.add.sprite(_this.x, _this.y, 'player'), scene.add.sprite(_this.x, _this.y, 'player'), scene.add.sprite(_this.x, _this.y, 'player')];

    _this.spriteAfterImages.forEach(function (img, i) {
      img.tint = 0x3333e6;
      img.alpha = 1 - i / _this.spriteAfterImages.length;
      img.depth = -(i + 1);
      img.visible = false;
    });

    _this.spriteShield = _this.scene.add.sprite(_this.x, _this.y, 'player_shield');
    _this.spriteShield.visible = false;
    _this.spriteJetfire = _this.scene.add.sprite(_this.x, _this.y, 'player_jetfire');

    _this.spriteJetfire.anims.play('player_jetfire_animation');

    _this.meter = new Meter(0, _this.scene);
    _this.shootSFX = _this.scene.sound.add('playerShoot');
    _this.shieldSFX = _this.scene.sound.add('playerShield');
    _this.dashSFX = _this.scene.sound.add('playerDash');
    _this.specialSFX = _this.scene.sound.add('playerSpecial');
    _this.deathSFX = _this.scene.sound.add('playerDeath');
    _this.bullets = new BulletContainer(5, _assertThisInitialized(_assertThisInitialized(_this)));
    _this.special = new ClearRadius(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Player, [{
    key: "createAnimations",
    value: function createAnimations() {
      this.scene.anims.create({
        key: 'player_death_animation',
        frames: this.scene.anims.generateFrameNumbers('player', {
          start: 0,
          end: 13
        }),
        frameRate: 30
      });
      this.scene.anims.create({
        key: 'player_jetfire_animation',
        frames: this.scene.anims.generateFrameNumbers('player_jetfire', {
          start: 0,
          end: 4
        }),
        frameRate: 8,
        repeat: -1
      });
      this.scene.anims.create({
        key: 'menuCursorAnimation',
        frames: this.scene.anims.generateFrameNumbers('menuCursor', {
          start: 0,
          end: 2
        }),
        frameRate: 6,
        repeat: -1
      });
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations() {
      this.scene.anims.remove('player_death_animation');
      this.scene.anims.remove('player_jetfire_animation');
      this.scene.anims.remove('menuCursorAnimation');
      this.special.removeAnimations();
    }
  }, {
    key: "listenKeystrokes",
    value: function listenKeystrokes() {
      var _this2 = this;

      this.scene.input.keyboard.on('keydown', function (e) {
        _this2.scene.game.controller.press(e.code);
      });
      this.scene.input.keyboard.on('keyup', function (e) {
        _this2.scene.game.controller.release(e.code);
      });
    }
  }, {
    key: "hit",
    value: function hit() {
      this.scene.timer.stop();
      this.sprite.anims.play('player_death_animation');
      this.deathSFX.play();
      this.sprite.on('animationcomplete', function () {
        this.visible = false;
      }, this.sprite);
      this.spriteJetfire.destroy();
      this.spriteAfterImages.forEach(function (s) {
        return s.destroy();
      });
      var menu = this.scene.add.sprite(this.scene.game.canvas.width / 2, this.scene.game.canvas.height / 2, 'menuBox'); // to draw boxes

      var graphics = this.scene.add.graphics({
        lineStyle: {
          color: 0
        },
        fillStyle: {
          color: 0xffffff
        }
      });
      var cursor = this.scene.add.sprite(this.scene.game.canvas.width / 2, 0, 'menuCursor');
      cursor.anims.play('menuCursorAnimation');
      var buttonStyle = {
        fontFamily: 'Kong Text',
        fill: '#000',
        backgroundColor: '#fff' // retry/main menu buttons

      };
      var width = 190;
      var height = 75;
      var centerX = this.scene.game.canvas.width / 2;
      var x = centerX - width / 2;
      var retry = [x, 308, width, height];
      var mainmenu = [x, 390, width, height];
      graphics.strokeRect.apply(graphics, retry);
      graphics.fillRect.apply(graphics, retry);
      graphics.strokeRect.apply(graphics, mainmenu);
      graphics.fillRect.apply(graphics, mainmenu); // time achieved

      var time = this.scene.timer.getHHMMSS();
      this.scene.add.text(centerX, 185, "Time achieved:", buttonStyle).setOrigin(0.5).setFontSize(10);
      this.scene.add.text(centerX, 210, "".concat(time.h, ":").concat(time.m, ":").concat(time.s), buttonStyle).setOrigin(0.5).setFontSize(19); // best time

      var scores = localStorage.getItem('scores');
      var topScore;

      if (scores) {
        try {
          scores = JSON.parse(scores);
          scores.push(this.scene.timer.frames);
          topScore = this.scene.timer.getHHMMSS(Math.max.apply(Math, _toConsumableArray(scores)));
          localStorage.setItem('scores', JSON.stringify(scores));
        } catch (e) {
          console.log(e);
        }
      } else {
        topScore = time;
        localStorage.setItem('scores', JSON.stringify([this.scene.timer.frames]));
      }

      this.scene.add.text(centerX, 235, "Best time:", buttonStyle).setOrigin(0.5).setFontSize(10);
      this.scene.add.text(centerX, 260, "".concat(topScore.h, ":").concat(topScore.m, ":").concat(topScore.s), buttonStyle).setOrigin(0.5).setFontSize(19);
      this.scene.add.text(centerX, retry[1] + 37, 'RETRY', buttonStyle).setOrigin(0.5);
      this.scene.add.text(centerX, mainmenu[1] + 37, 'MAIN MENU', buttonStyle).setOrigin(0.5);
      cursor.y = retry[1] + 37;
      var option = 0;
      var i = 0;
      var j = 0;
      var changeScene = false;

      this.update = function () {
        if (j >= 60) {
          if (this.scene.game.controller.pressingButton('up')) {
            if (i === 0) {
              option = +!option;
              this.scene.menuSelect.play();
            }

            i = (i + 1) % 10;
          } else if (this.scene.game.controller.pressingButton('down')) {
            if (i === 0) {
              option = +!option;
              this.scene.menuSelect.play();
            }

            i = (i + 1) % 10;
          }

          if (this.scene.game.controller.pressingButton('shoot')) {
            this.scene.player.removeAnimations();
            this.scene.boss.removeAnimations();
            this.scene.destroyObjects();

            if (option === 0 && !changeScene) {
              this.scene.menuClick.play();
              this.scene.scene.start('Game');
            } else if (option === 1 && !changeScene) {
              this.scene.menuClick.play();
              this.scene.scene.start('MainMenu');
            }

            changeScene = true;
          }
        }

        j++;
        cursor.y = [retry[1], mainmenu[1]][option] + 37;
        this.meter.update();
        this.bullets.update();
        this.special.update();
      };
    }
  }, {
    key: "updateSprite",
    value: function updateSprite() {
      this.sprite.x = this.x;
      this.sprite.y = this.y;
      this.spriteJetfire.x = this.x;
      this.spriteJetfire.y = this.y;
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      if (!this.isDashing) {
        this.scene.game.controller.pressingButton('left') ? this.x -= this.speed : '';
        this.scene.game.controller.pressingButton('up') ? this.y -= this.speed : '';
        this.scene.game.controller.pressingButton('down') ? this.y += this.speed : '';
        this.scene.game.controller.pressingButton('right') ? this.x += this.speed : '';
      }

      this.updateSprite();
      this.meter.update();
      this.bullets.update();
      this.special.update(); // player dies if touched by the boss
      // or its projectiles unless the player
      // has a shield active

      for (var key in this.scene.objects) {
        if (key.startsWith('boss')) {
          this.scene.objects[key].forEach(function (obj) {
            if (_this3.collidesWith(obj) && obj.active && !_this3.shieldActive) {
              _this3.hit();
            }
          });
        }
      }
    }
  }], [{
    key: "loadAssets",
    value: function loadAssets(scene) {
      scene.load.spritesheet('player', 'assets/game/player/player.png', {
        frameWidth: 50,
        frameHeight: 50
      });
      scene.load.image('player_shield', 'assets/game/player/shield.png');
      scene.load.spritesheet('player_jetfire', 'assets/game/player/jetfire.png', {
        frameWidth: 50,
        frameHeight: 50
      });
      Meter.loadAssets(scene);
      BulletContainer.loadAssets(scene);
      ClearRadius.loadAssets(scene);
      scene.load.audio('playerShoot', ['assets/audio/playerShoot.mp3', 'assets/audio/playerShoot.ogg']);
      scene.load.audio('playerDash', ['assets/audio/playerDash.mp3', 'assets/audio/playerDash.ogg']);
      scene.load.audio('playerShield', ['assets/audio/playerShield.mp3', 'assets/audio/playerShield.ogg']);
      scene.load.audio('playerSpecial', ['assets/audio/playerSpecial.mp3', 'assets/audio/playerSpecial.ogg']);
      scene.load.audio('playerDeath', ['assets/audio/playerDeath.mp3', 'assets/audio/playerDeath.ogg']);
    }
  }]);

  return Player;
}(Entity);

addShoot(Player);
addShield(Player);
addDash(Player);
addSpecials(Player);
trapInBounds(Player);
module.exports = Player;

},{"../Entity":3,"../trapInBounds":35,"./BulletContainer":27,"./ClearRadius":28,"./Dash":29,"./Meter":30,"./Shield":32,"./Shoot":33,"./Specials":34}],32:[function(require,module,exports){
"use strict";

var _require = require('../../utils'),
    decorate = _require.decorate;

module.exports = function (player) {
  player.prototype.shieldActive = false;

  player.prototype.canHit = function () {
    return !this.shieldActive;
  };

  var shieldTimer = 0;
  var shieldTimerT = 120;
  var i = 0;
  player.prototype.update = decorate(player.prototype.update, function () {
    if (this.scene.game.controller.pressingButton('shield') && !this.scene.game.controller.buttonHeld('shield') && !this.scene.game.controller.pressingButton('shoot')) {
      if (i === 2 && this.meter.useBars(1)) {
        this.shieldSFX.play();
        this.spriteShield.visible = true;
        this.shieldActive = true;
        shieldTimer += shieldTimerT;
      }

      i = (i + 1) % 60;
    } else {
      i = 0;
    }

    if (this.shieldActive && shieldTimer > 0) {
      if (shieldTimer <= 10) {
        if (shieldTimer % 2 === 0) {
          this.spriteShield.visible = false;
        } else {
          this.spriteShield.visible = true;
        }
      } else if (shieldTimer <= 60) {
        if (shieldTimer % 5 === 0) {
          this.spriteShield.visible = false;
        } else {
          this.spriteShield.visible = true;
        }
      }

      shieldTimer--;
    } else {
      this.shieldActive = false;
      this.spriteShield.visible = false;
    }

    this.spriteShield.x = this.x;
    this.spriteShield.y = this.y;
  });
};

},{"../../utils":39}],33:[function(require,module,exports){
"use strict";

var _require = require('../../utils'),
    decorate = _require.decorate;

module.exports = function (player) {
  var i = 0;
  player.prototype.update = decorate(player.prototype.update, function () {
    if (this.scene.game.controller.pressingButton('shoot') && !this.scene.game.controller.pressingButton('shield')) {
      if (i === 0) {
        if (this.bullets.fire()) {
          this.shootSFX.play();
        }
      }

      i = (i + 1) % 10;
    } else {
      i = 0;
    }
  });
};

},{"../../utils":39}],34:[function(require,module,exports){
"use strict";

var _require = require('../../utils'),
    decorate = _require.decorate;

module.exports = function (player) {
  var inputBuffer = [];
  var inputBufferMax = 28;

  function is360() {
    /*
    	O(n^2);
    	could probably make this O(n)
    */
    for (var i = 0; i < inputBuffer.length; i++) {
      if (is360Helper(inputBuffer.slice(i))) return true;
    }

    return false;
  }

  function is360Helper(inputBuffer) {
    var dirs = [8, 1, 4, 2]; // up right down left

    var clockwise = true;
    var index = 0;
    var buffer = 0;
    var bufferMax = 7;
    var step = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = inputBuffer[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;
        if (buffer >= bufferMax) return false;
        if (step >= dirs.length) return true;

        if (~dirs.indexOf(i) && step === 0) {
          buffer = 0;
          index = dirs.indexOf(i);
          step++;
          continue;
        } else if (step === 1) {
          var next = (index + 1) % dirs.length;
          var prev = (dirs.length + index - 1) % dirs.length;

          if (i === dirs[next]) {
            buffer = 0;
            index = next;
            step++;
            continue;
          } else if (i === dirs[prev]) {
            buffer = 0;
            clockwise = false;
            index = prev;
            step++;
            continue;
          }
        } else if (step === 2 || step === 3) {
          var _next = void 0;

          if (clockwise) {
            _next = (index + 1) % dirs.length;
          } else {
            _next = (dirs.length + index - 1) % dirs.length;
          }

          if (i === dirs[_next]) {
            buffer = 0;
            index = _next;
            step++;
            continue;
          }
        }

        buffer++;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  }

  player.prototype.update = decorate(player.prototype.update, function () {
    var dirBits = 0;
    dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('up');
    dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('down');
    dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('left');
    dirBits = (dirBits << 1) + this.scene.game.controller.pressingButton('right');
    inputBuffer.push(dirBits);

    if (inputBuffer.length > inputBufferMax) {
      inputBuffer.splice(0, 1);
    }

    if (this.scene.game.controller.pressingButton('shoot')) {
      if (is360() && this.meter.useBars(2)) {
        this.special.use();
      }

      inputBuffer.length = 0;
    }
  });
};

},{"../../utils":39}],35:[function(require,module,exports){
"use strict";

var _require = require('../utils'),
    decorate = _require.decorate;

module.exports = function (entity) {
  entity.prototype.update = decorate(entity.prototype.update, function () {
    var w = Math.round(this.width / 2);
    var h = Math.round(this.height / 2);

    if (this.x < w) {
      this.x = w;
    } else if (this.x > this.scene.game.canvas.width - w) {
      this.x = this.scene.game.canvas.width - w;
    }

    if (this.y < h) {
      this.y = h;
    } else if (this.y > this.scene.game.canvas.height - h) {
      this.y = this.scene.game.canvas.height - h;
    }

    this.updateSprite();
  });
};

},{"../utils":39}],36:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MainMenu = require('./scenes/MainMenu');

var GameScene = require('./scenes/Game');

var Controller = require('./Controller');

var Game =
/*#__PURE__*/
function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game(config) {
    var _this;

    _classCallCheck(this, Game);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this, config));
    _this.controller = new Controller();
    var buttonConfig = localStorage.getItem('buttonConfig');

    if (buttonConfig) {
      try {
        buttonConfig = JSON.parse(buttonConfig);

        for (var button in buttonConfig) {
          _this.controller.changeKey(button, buttonConfig[button]);
        }
      } catch (e) {
        console.log(e);
      }
    }

    return _this;
  }

  return Game;
}(Phaser.Game);
/*
const GameSceneDebug = require('./scenes/GameDebug');
GameSceneDebug(GameScene);
*/


var config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  backgroundColor: 0xffffff,
  scene: [MainMenu, GameScene],
  disableContextMenu: true
};
var game = new Game(config);

},{"./Controller":1,"./scenes/Game":37,"./scenes/MainMenu":38}],37:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Background = require('../entities/Background');

var Boss = require('../entities/boss/Boss');

var Player = require('../entities/player/Player');

var Timer = require('../entities/Timer');

module.exports =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(_class, _Phaser$Scene);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, {
      key: 'Game',
      active: false
    }));
    _this.objects = {};
    return _this;
  }

  _createClass(_class, [{
    key: "addObject",
    value: function addObject(key, obj) {
      if (key in this.objects) {
        this.objects[key].push(obj);
      } else {
        this.objects[key] = [obj];
      }
    }
  }, {
    key: "destroyObjects",
    value: function destroyObjects() {
      for (var k in this.objects) {
        delete this.objects[k];
      }
    }
  }, {
    key: "init",
    value: function init(data) {
      this.disableBackground = data.disableBackground;
    }
  }, {
    key: "preload",
    value: function preload() {
      if (!this.disableBackground) Background.loadAssets(this);
      this.load.image('menuBox', 'assets/menu/menuBox.png');
      this.load.spritesheet('menuCursor', 'assets/menu/menuCursor.png', {
        frameWidth: 280,
        frameHeight: 27
      });
      this.load.audio('menuSelect', ['assets/audio/menuSelect.mp3', 'assets/audio/menuSelect.ogg']);
      this.load.audio('menuClick', ['assets/audio/menuClick.mp3', 'assets/audio/menuClick.ogg']);
      Boss.loadAssets(this);
      Player.loadAssets(this);
    }
  }, {
    key: "create",
    value: function create() {
      this.menuSelect = this.sound.add('menuSelect');
      this.menuClick = this.sound.add('menuClick');

      if (!this.disableBackground) {
        this.background = new Background(this);
      }

      this.timer = new Timer(this);
      this.player = new Player(this, 180, 500);
      this.boss = new Boss(this, 180, 100);
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.disableBackground) this.background.update();
      this.timer.update();
      this.boss.update();
      this.player.update();
    }
  }]);

  return _class;
}(Phaser.Scene);

},{"../entities/Background":2,"../entities/Timer":4,"../entities/boss/Boss":5,"../entities/player/Player":31}],38:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// this scene has messy code
// refactor some time
module.exports =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(_class, _Phaser$Scene);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, {
      key: 'MainMenu',
      active: true
    }));
    _this.shipI = 0;
    _this.shipIMax = 20;
    _this.shipY = 195; // frame buffer for adjusting input timing

    _this.i = 0;
    _this.ix = 10;
    _this.menuEnum = {
      main: 0,
      config: 1,
      howto: 2
    };
    _this.changingKey = false;
    _this.buttonToChange = null;
    return _this;
  }

  _createClass(_class, [{
    key: "preload",
    value: function preload() {
      this.load.image('menuBox', 'assets/menu/menuBox.png');
      this.load.image('updown', 'assets/menu/updown.png');
      this.load.image('title', 'assets/menu/title.png');
      this.load.image('ship', 'assets/menu/ship.png');
      this.load.image('howto360', 'assets/menu/360.png');
      this.load.spritesheet('menuCursor', 'assets/menu/menuCursor.png', {
        frameWidth: 280,
        frameHeight: 27
      });
      this.load.audio('menuSelect', ['assets/audio/menuSelect.mp3', 'assets/audio/menuSelect.ogg']);
      this.load.audio('menuBack', ['assets/audio/menuBack.mp3', 'assets/audio/menuBack.ogg']);
      this.load.audio('menuClick', ['assets/audio/menuClick.mp3', 'assets/audio/menuClick.ogg']);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$cursorPositions,
          _this$cursorPosition,
          _this2 = this;

      // audio
      this.menuSelect = this.sound.add('menuSelect');
      this.menuBack = this.sound.add('menuBack');
      this.menuClick = this.sound.add('menuClick');
      var centerX = this.game.canvas.width / 2;
      this.ship = this.add.sprite(centerX, this.shipY, 'ship');
      this.add.sprite(centerX - 3, this.game.canvas.height / 8, 'title'); // menu box
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      var menuY = this.game.canvas.height / 3 * 2;
      this.menuBox = this.add.sprite(centerX, menuY, 'menuBox');
      this.graphics = this.add.graphics({
        fillStyle: {
          color: 0xffffff
        },
        lineStyle: {
          color: 0
        }
      });
      this.menu = this.menuEnum.main;
      this.cursorPositionsY = (_this$cursorPositions = {}, _defineProperty(_this$cursorPositions, this.menuEnum.main, [320, 389, 461]), _defineProperty(_this$cursorPositions, this.menuEnum.config, [555, 310, 350, 390, 430, 470, 510]), _defineProperty(_this$cursorPositions, this.menuEnum.howto, [555]), _this$cursorPositions);
      this.cursorPosition = (_this$cursorPosition = {}, _defineProperty(_this$cursorPosition, this.menuEnum.main, 0), _defineProperty(_this$cursorPosition, this.menuEnum.config, 1), _defineProperty(_this$cursorPosition, this.menuEnum.howto, 0), _this$cursorPosition);
      this.createAnimations();
      this.menuCursor = this.add.sprite(centerX, this.cursorPositionsY[this.menu][this.cursorPosition[this.menu]], 'menuCursor');
      this.menuCursor.anims.play('menuCursorAnimation');
      this.menuObjects = [];
      this.drawMenu(); ////////////////////////////////////////////////////////////////////////////////////////////////////////

      this.add.text(this.game.canvas.width - 5, this.game.canvas.height - 5, 'made by Tyson Ngo', {
        fontFamily: 'Kong Text',
        fontSize: '8.5pt',
        fill: '#000',
        backgroundColor: '#fff'
      }).setOrigin(1);
      this.input.keyboard.on('keydown', function (e) {
        if (_this2.changingKey) {
          _this2.changingKey = false;

          if (e.code === 'Escape') {
            _this2.menuBack.play();

            return _this2.drawMenu(_this2.menu);
          }

          _this2.menuClick.play();

          _this2.game.controller.changeKey(_this2.buttonToChange, e.code);

          localStorage.setItem('buttonConfig', JSON.stringify({
            'up': _this2.game.controller.getKey('up'),
            'down': _this2.game.controller.getKey('down'),
            'left': _this2.game.controller.getKey('left'),
            'right': _this2.game.controller.getKey('right'),
            'shoot': _this2.game.controller.getKey('shoot'),
            'shield': _this2.game.controller.getKey('shield')
          }));

          _this2.drawMenu(_this2.menu);
        } else {
          _this2.game.controller.press(e.code);
        }
      });
      this.input.keyboard.on('keyup', function (e) {
        _this2.game.controller.release(e.code);

        _this2.i = 0;
      });
    }
  }, {
    key: "createAnimations",
    value: function createAnimations() {
      this.anims.create({
        key: 'menuCursorAnimation',
        frames: this.anims.generateFrameNumbers('menuCursor', {
          start: 0,
          end: 2
        }),
        frameRate: 6,
        repeat: -1
      });
    }
  }, {
    key: "removeAnimations",
    value: function removeAnimations() {
      this.anims.remove('menuCursorAnimation');
    }
  }, {
    key: "moveCursor",
    value: function moveCursor() {
      this.menuCursor.y = this.cursorPositionsY[this.menu][this.cursorPosition[this.menu]];
    }
  }, {
    key: "drawMenu",
    value: function drawMenu() {
      var _this$menuObjects, _this$menuObjects2, _this$menuObjects3;

      var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.graphics.clear();
      this.menuObjects.forEach(function (o) {
        o.destroy();
      });
      this.menu = menu;

      switch (this.menu) {
        case this.menuEnum.main:
          (_this$menuObjects = this.menuObjects).push.apply(_this$menuObjects, _toConsumableArray(this.drawMenuBoxes())); // menu keys display


          this.menuObjects.push(this.add.sprite(145, 538, 'updown'));
          var style = {
            fontFamily: 'Kong Text',
            fontSize: '8.5pt',
            fill: '#000',
            backgroundColor: '#fff'
          };
          this.menuObjects.push(this.add.text(125, 505, this.game.controller.getKey('up'), style));
          this.menuObjects.push(this.add.text(125, 560, this.game.controller.getKey('down'), style));
          this.menuObjects.push(this.add.text(196, 533, this.game.controller.getKey('shoot'), style));
          break;

        case this.menuEnum.config:
          (_this$menuObjects2 = this.menuObjects).push.apply(_this$menuObjects2, _toConsumableArray(this.drawMenuBoxes()));

          break;

        case this.menuEnum.howto:
          (_this$menuObjects3 = this.menuObjects).push.apply(_this$menuObjects3, _toConsumableArray(this.drawMenuBoxes()));

          break;
      }
    }
  }, {
    key: "drawMenuBoxes",
    value: function drawMenuBoxes() {
      var boxes = [];
      var box;
      var style = {
        fontFamily: 'Kong Text',
        fill: '#000',
        backgroundColor: '#fff'
      };

      switch (this.menu) {
        case this.menuEnum.main:
          box = [190, 60, 290, 70];
          boxes.push(this.drawMenuBox.apply(this, [0, 'START'].concat(_toConsumableArray(box))));
          boxes.push(this.drawMenuBox.apply(this, [1, 'CONFIG'].concat(_toConsumableArray(box))));
          boxes.push(this.drawMenuBox.apply(this, [2, 'HOW TO PLAY'].concat(_toConsumableArray(box))));
          break;

        case this.menuEnum.config:
          box = [190, 30, 533, -40];
          boxes.push(this.drawMenuBox(0, 'BACK', 190, 40, 533, 70));
          var text = [null, 'UP', 'DOWN', 'LEFT', 'RIGHT', 'SHOOT', 'SHIELD'];

          for (var i = 1; i < this.cursorPositionsY[this.menu].length; i++) {
            this.drawMenuBox.apply(this, [i, ''].concat(_toConsumableArray(box)));
            style.fontSize = '13px';
            boxes.push(this.add.text(130, this.cursorPositionsY[this.menu][i], text[i], style).setOrigin(0.5));
            style.fontSize = '8px';
            boxes.push(this.add.text(180, this.cursorPositionsY[this.menu][i] - 3, this.game.controller.getKey(text[i].toLowerCase()), style));
          }

          break;

        case this.menuEnum.howto:
          box = [190, 40, 533, 70];
          boxes.push(this.drawMenuBox.apply(this, [0, 'BACK'].concat(_toConsumableArray(box))));
          this.drawMenuBox(1, '', 190, 230, 290, 0);
          style.fontSize = '8px';
          boxes.push(this.add.text(90, 300, "SURVIVE AS LONG\nAS POSSIBLE.\n\ncontrols:\n  UP     (".concat(this.game.controller.getKey('up'), ")\n  DOWN   (").concat(this.game.controller.getKey('down'), ")\n  LEFT   (").concat(this.game.controller.getKey('left'), ")\n  RIGHT  (").concat(this.game.controller.getKey('right'), ")\n  SHOOT  (").concat(this.game.controller.getKey('shoot'), ")\n  SHIELD (").concat(this.game.controller.getKey('shield'), ")\n\nSHOOT UP TO 5 BULLETS\nAT A TIME.\n\nSHIELD MAKES YOU\nINVULNERABLE FOR A\nSHORT TIME AT A\nCOST OF 25% METER.\n\nSHIELD+SHOOT TO DASH\n\n    360+SHOOT TO CLEAR\n    OUT NEARBY ENEMY\n    PROJECTILES AT A\n    COST OF 50% METER.\n\nMETER IS BUILT WHEN\nA BULLET HITS THE\nENEMY.\n"), style));
          boxes.push(this.add.sprite(105, 461, 'howto360'));
          break;
      }

      return boxes;
    }
  }, {
    key: "drawMenuBox",
    value: function drawMenuBox(menuPos, text, boxWidth, boxHeight, boxFirstY, boxYOffset) {
      var _this$graphics, _this$graphics2;

      var menuY = this.game.canvas.height / 3 * 2;
      var centerX = this.game.canvas.width / 2;
      var buttonStyle = {
        fontFamily: 'Kong Text',
        fill: '#000',
        backgroundColor: '#fff'
      };
      var box = [centerX - boxWidth / 2, boxFirstY + boxYOffset * menuPos, boxWidth, boxHeight];

      (_this$graphics = this.graphics).fillRect.apply(_this$graphics, box);

      (_this$graphics2 = this.graphics).strokeRect.apply(_this$graphics2, box);

      if (text) {
        return this.add.text(centerX, this.cursorPositionsY[this.menu][menuPos], text, buttonStyle).setOrigin(0.5);
      }
    }
  }, {
    key: "update",
    value: function update() {
      // moves ship
      this.ship.y = this.shipY + 7 * Math.sin(0.1 * this.shipI++ / Math.PI);
      if (this.changingKey) return; // key input

      if (this.game.controller.pressingButton('down')) {
        if (this.cursorPositionsY[this.menu].length > 1) {
          if (this.i === 0) {
            this.cursorPosition[this.menu] = (this.cursorPosition[this.menu] + 1) % this.cursorPositionsY[this.menu].length;
            this.menuSelect.play();
          }

          this.i = (this.i + 1) % this.ix;
        }
      }

      if (this.game.controller.pressingButton('up')) {
        if (this.cursorPositionsY[this.menu].length > 1) {
          if (this.i === 0) {
            this.cursorPosition[this.menu] = (this.cursorPosition[this.menu] + this.cursorPositionsY[this.menu].length - 1) % this.cursorPositionsY[this.menu].length;
            this.menuSelect.play();
          }

          this.i = (this.i + 1) % this.ix;
        }
      }

      this.moveCursor();

      if (this.game.controller.pressingButton('shoot')) {
        if (this.i === 0) {
          if (this.menu === this.menuEnum.main) {
            this.menuClick.play();

            switch (this.cursorPosition[this.menu]) {
              case 0:
                this.removeAnimations();
                this.game.controller.releaseAll();
                this.scene.start('Game');
                break;

              case 1:
                this.drawMenu(this.menuEnum.config);
                break;

              case 2:
                this.drawMenu(this.menuEnum.howto);
                break;
            }
          } else if (this.menu === this.menuEnum.config) {
            var buttons = [null, 'up', 'down', 'left', 'right', 'shoot', 'shield'];

            switch (this.cursorPosition[this.menu]) {
              case 0:
                this.cursorPosition[this.menu] = 1;
                this.drawMenu(this.menuEnum.main);
                this.menuBack.play();
                break;

              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
                this.menuClick.play();
                this.graphics.fillRect(50, 135, this.game.canvas.width - 100, 150);
                this.graphics.strokeRect(50, 135, this.game.canvas.width - 100, 150);
                this.menuObjects.push(this.add.text(80, 165, "Press a key\nto change the\n'".concat(buttons[this.cursorPosition[this.menu]], "' button\n\nESC to cancel"), {
                  fontFamily: 'Kong Text',
                  fill: '#000',
                  backgroundColor: '#fff'
                }));
                this.changingKey = true;
                this.buttonToChange = buttons[this.cursorPosition[this.menu]];
                break;
            }
          } else if (this.menu === this.menuEnum.howto) {
            this.drawMenu(this.menuEnum.main);
            this.menuBack.play();
          }
        }

        this.i = (this.i + 1) % this.ix;
      }
    }
  }]);

  return _class;
}(Phaser.Scene);

},{}],39:[function(require,module,exports){
"use strict";

function decorate(fn, cb) {
  return function () {
    fn.apply(this, arguments);
    cb.apply(this, arguments);
  };
}

module.exports = {
  decorate: decorate
};

},{}]},{},[36]);
