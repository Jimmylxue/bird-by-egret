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
var CustomDispatcher = (function (_super) {
    __extends(CustomDispatcher, _super);
    function CustomDispatcher() {
        return _super.call(this) || this;
    }
    CustomDispatcher.prototype.gameOver = function () {
        this.dispatchEventWith(CustomDispatcher.OVER);
    };
    CustomDispatcher.prototype.startGame = function () {
        this.dispatchEventWith(CustomDispatcher.START);
    };
    CustomDispatcher.prototype.birdLeap = function () {
        this.dispatchEventWith(CustomDispatcher.CLICK);
    };
    CustomDispatcher.OVER = "gameover";
    CustomDispatcher.CLICK = "click";
    CustomDispatcher.START = "gamestart";
    return CustomDispatcher;
}(egret.EventDispatcher));
__reflect(CustomDispatcher.prototype, "CustomDispatcher");
