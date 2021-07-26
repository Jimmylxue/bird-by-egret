var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Store = (function () {
    function Store() {
        this.status = Store.PENDING;
    }
    Store.prototype.start = function () {
        if (this.status === Store.PENDING) {
            this.status = Store.STAR;
        }
    };
    Store.prototype.over = function () {
        if (this.status === Store.STAR) {
            this.status = Store.OVER;
            alert('游戏结束');
        }
    };
    Store.PENDING = 'pending';
    Store.STAR = 'star';
    Store.OVER = 'over';
    return Store;
}());
__reflect(Store.prototype, "Store");
