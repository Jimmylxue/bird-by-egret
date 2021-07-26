var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    // 定义静态变量，方便倒是碰撞检测在其他的类中能拿到
    // static postitionX: number = 0
    // static postitiony: number = 0
    function Bird(dispatcher) {
        var _this = _super.call(this) || this;
        _this.fnc = new Fnc();
        _this.bird = new egret.Bitmap;
        _this.leapCount = 40;
        _this.dropCount = 1;
        _this.startGame = false;
        console.log('dispatcher', dispatcher);
        if (dispatcher) {
            dispatcher.addEventListener(CustomDispatcher.CLICK, _this.leap, _this);
            dispatcher.addEventListener(CustomDispatcher.OVER, _this.stop, _this);
        }
        _this.bird = _this.fnc.createBitmapByName('body');
        _this.bird.x = 300;
        _this.bird.y = egret.MainContext.instance.stage.stageHeight / 2;
        _this.addChild(_this.bird);
        _this.bird.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            alert(11111);
        }, _this);
        return _this;
    }
    Bird.prototype.changeStatus = function () {
        this.startGame = true;
        console.log('开始游戏了');
    };
    Bird.prototype.move = function (store) {
        if (store.status !== Store.STAR) {
            return;
        }
        this.bird.y += this.dropCount;
        this.collisionTest();
    };
    Bird.prototype.collisionTest = function () {
        // 碰撞检测
    };
    Bird.prototype.leap = function () {
        this.bird.y -= this.leapCount;
    };
    Bird.prototype.stop = function () {
        alert('game over了');
    };
    return Bird;
}(egret.Sprite));
__reflect(Bird.prototype, "Bird");
