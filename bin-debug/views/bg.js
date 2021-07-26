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
// 继承一个派生类之后才可以 使用 this.addChild() 往canvas中画元素
var Bg = (function (_super) {
    __extends(Bg, _super);
    function Bg() {
        var _this = _super.call(this) || this;
        _this.fnc = new Fnc();
        _this.cloud = [];
        _this.mountain = [];
        _this.grass = [];
        _this.stone = [];
        _this.pipe = [];
        _this.cloud_v = 1;
        _this.grass_v = 5;
        _this.mountain_v = 5;
        _this.stone_v = 5;
        _this.pipe_v = 5; // 水管速度
        _this.pipe_distance_y = 180; // 两个水管y轴之间的距离
        _this.pipe_distance_x = 280; // 两个水管x轴之间的距离
        _this.init();
        return _this;
    }
    Bg.prototype.init = function () {
        for (var i = 0; i < 2; i++) {
            this.cloud[i] = this.fnc.createBitmapByName('cloud');
            this.cloud[i].width = egret.MainContext.instance.stage.stageWidth;
            this.cloud[i].height = 400;
            this.cloud[i].y = egret.MainContext.instance.stage.stageHeight - 400;
            this.mountain[i] = this.fnc.createBitmapByName('bg_grass');
            this.mountain[i].width = egret.MainContext.instance.stage.stageWidth;
            this.mountain[i].y = egret.MainContext.instance.stage.stageHeight - this.mountain[i].height;
            this.grass[i] = this.fnc.createBitmapByName('flower');
            this.grass[i].width = egret.MainContext.instance.stage.stageWidth;
            this.grass[i].y = egret.MainContext.instance.stage.stageHeight - this.grass[i].height;
            this.stone[i] = this.fnc.createBitmapByName('stone');
            this.stone[i].width = egret.MainContext.instance.stage.stageWidth;
            this.stone[i].y = egret.MainContext.instance.stage.stageHeight - this.stone[i].height;
        }
        this.addChild(this.cloud[0]);
        this.addChild(this.cloud[1]);
        this.addChild(this.mountain[0]);
        this.addChild(this.mountain[1]);
        this.addChild(this.grass[0]);
        this.addChild(this.grass[1]);
        this.addChild(this.stone[0]);
        this.addChild(this.stone[1]);
        this.cloud[1].x = egret.MainContext.instance.stage.stageWidth;
        this.grass[1].x = egret.MainContext.instance.stage.stageWidth;
        this.mountain[1].x = egret.MainContext.instance.stage.stageWidth;
        this.stone[1].x = egret.MainContext.instance.stage.stageWidth;
        this.startGame();
    };
    Bg.prototype.move = function (store, bird) {
        this.store = store;
        if (store.status !== Store.STAR) {
            return;
        }
        // 让背景动起来
        this.detailMove(this.cloud, this.cloud_v);
        this.detailMove(this.grass, this.grass_v);
        this.detailMove(this.mountain, this.mountain_v);
        this.detailMove(this.stone, this.stone_v);
        // for()
        for (var i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x -= this.pipe_v;
            if (this.pipe[i].x < 0) {
                this.pipe[i].x += egret.MainContext.instance.stage.stageWidth;
            }
        }
        this.collisionTest(bird);
    };
    Bg.prototype.startGame = function () {
        // 创建小水管
        for (var i = 0; i < 4; i++) {
            // 因为pipe是 egret.Sprite 类型的数组  所以它的每一项应该要是egret.Sprite() 类型
            this.pipe[i] = new egret.Sprite();
            var pipe_up = this.fnc.createBitmapByName('bamboo_up');
            var pipe_down = this.fnc.createBitmapByName('bamboo_down');
            // pipe_up.x = pipe_down.x = egret.MainContext.instance.stage.stageWidth + i * this.pipe_distance_x
            // 设置整个容器的 x 而不是设置单个图形的 x
            this.pipe[i].x = egret.MainContext.instance.stage.stageWidth + i * this.pipe_distance_x;
            // pipe_up.x = pipe_down.x = 0
            pipe_up.height = Math.floor(Math.random() * 200) + 50;
            pipe_down.y = pipe_up.height + this.pipe_distance_y;
            pipe_down.height = egret.MainContext.instance.stage.stageHeight - pipe_down.y;
            this.pipe[i].addChild(pipe_up);
            this.pipe[i].addChild(pipe_down);
            // console.log(this.pipe)
            this.addChild(this.pipe[i]);
        }
    };
    Bg.prototype.detailMove = function (obj, speed) {
        for (var i = 0; i < 2; i++) {
            obj[i].x -= speed;
            if (obj[i].x <= -(obj[i].width - speed)) {
                obj[i].x += 2 * obj[i].width;
            }
        }
    };
    Bg.prototype.collisionTest = function (bird) {
        // console.log('鸟的x和y', bird.x, bird.y)
        console.log(bird.y + bird.height, this.grass[0].y);
        if (bird.y + bird.height === this.grass[0].y + 330) {
            this.store.over();
            console.log(this.store);
            // alert('触底了')
        }
    };
    return Bg;
}(egret.Sprite));
__reflect(Bg.prototype, "Bg");
