// 继承一个派生类之后才可以 使用 this.addChild() 往canvas中画元素
class Bg extends egret.Sprite {
	private fnc = new Fnc()

	private store: Store

	private cloud: egret.Bitmap[] = []
	private mountain: egret.Bitmap[] = []
	private grass: egret.Bitmap[] = []
	private stone: egret.Bitmap[] = []
	private pipe: egret.Sprite[] = []

	private cloud_v: number = 1
	private grass_v: number = 5
	private mountain_v: number = 5
	private stone_v: number = 5
	private pipe_v: number = 5 // 水管速度

	private pipe_distance_y = 180 // 两个水管y轴之间的距离
	private pipe_distance_x = 280 // 两个水管x轴之间的距离
	constructor() {
		super()


		this.init()
	}

	private init(): void {


		for (let i = 0; i < 2; i++) {
			this.cloud[i] = this.fnc.createBitmapByName('cloud')
			this.cloud[i].width = egret.MainContext.instance.stage.stageWidth
			this.cloud[i].height = 400
			this.cloud[i].y = egret.MainContext.instance.stage.stageHeight - 400

			this.mountain[i] = this.fnc.createBitmapByName('bg_grass')
			this.mountain[i].width = egret.MainContext.instance.stage.stageWidth
			this.mountain[i].y = egret.MainContext.instance.stage.stageHeight - this.mountain[i].height

			this.grass[i] = this.fnc.createBitmapByName('flower')
			this.grass[i].width = egret.MainContext.instance.stage.stageWidth
			this.grass[i].y = egret.MainContext.instance.stage.stageHeight - this.grass[i].height

			this.stone[i] = this.fnc.createBitmapByName('stone')
			this.stone[i].width = egret.MainContext.instance.stage.stageWidth
			this.stone[i].y = egret.MainContext.instance.stage.stageHeight - this.stone[i].height
		}

		this.addChild(this.cloud[0]);
		this.addChild(this.cloud[1]);
		this.addChild(this.mountain[0]);
		this.addChild(this.mountain[1]);
		this.addChild(this.grass[0]);
		this.addChild(this.grass[1]);
		this.addChild(this.stone[0]);
		this.addChild(this.stone[1]);

		this.cloud[1].x = egret.MainContext.instance.stage.stageWidth
		this.grass[1].x = egret.MainContext.instance.stage.stageWidth
		this.mountain[1].x = egret.MainContext.instance.stage.stageWidth
		this.stone[1].x = egret.MainContext.instance.stage.stageWidth

		this.startGame()

	}

	public move(store: Store, bird: egret.Bitmap): void {
		this.store = store
		if (store.status !== Store.STAR) {
			return
		}

		// 让背景动起来
		this.detailMove(this.cloud, this.cloud_v)
		this.detailMove(this.grass, this.grass_v)
		this.detailMove(this.mountain, this.mountain_v)
		this.detailMove(this.stone, this.stone_v)

		// for()
		for (let i = 0; i < this.pipe.length; i++) {
			this.pipe[i].x -= this.pipe_v
			if (this.pipe[i].x < 0) {
				this.pipe[i].x += egret.MainContext.instance.stage.stageWidth
			}
		}

		this.collisionTest(bird)


	}

	public startGame() {
		// 创建小水管
		for (let i = 0; i < 4; i++) {
			// 因为pipe是 egret.Sprite 类型的数组  所以它的每一项应该要是egret.Sprite() 类型
			this.pipe[i] = new egret.Sprite();
			let pipe_up = this.fnc.createBitmapByName('bamboo_up')
			let pipe_down = this.fnc.createBitmapByName('bamboo_down')
			// pipe_up.x = pipe_down.x = egret.MainContext.instance.stage.stageWidth + i * this.pipe_distance_x
			// 设置整个容器的 x 而不是设置单个图形的 x
			this.pipe[i].x = egret.MainContext.instance.stage.stageWidth + i * this.pipe_distance_x
			// pipe_up.x = pipe_down.x = 0
			pipe_up.height = Math.floor(Math.random() * 200) + 50;
			pipe_down.y = pipe_up.height + this.pipe_distance_y
			pipe_down.height = egret.MainContext.instance.stage.stageHeight - pipe_down.y

			this.pipe[i].addChild(pipe_up)
			this.pipe[i].addChild(pipe_down)
			// console.log(this.pipe)
			this.addChild(this.pipe[i])
		}
	}

	private detailMove(obj: egret.Bitmap[], speed) {
		for (let i = 0; i < 2; i++) {
			obj[i].x -= speed
			if (obj[i].x <= -(obj[i].width - speed)) {
				obj[i].x += 2 * obj[i].width;
			}
		}
	}

	private collisionTest(bird: egret.Bitmap) {
		// console.log('鸟的x和y', bird.x, bird.y)
		console.log(bird.y + bird.height, this.grass[0].y)
		if (bird.y + bird.height === this.grass[0].y + 330) {
			this.store.over()
			console.log(this.store)
			// alert('触底了')
		}
	}
	// init() {
	// 	this.addChild(this.cloud)
	// }
}
