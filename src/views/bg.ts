// 继承一个派生类之后才可以 使用 this.addChild() 往canvas中画元素
class Bg extends egret.Sprite {
	private fnc = new Fnc()
	private dispatcher: CustomDispatcher

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

	private score: number = 0
	private scoreText: egret.TextField
	constructor(dispatcher: CustomDispatcher) {
		super()
		this.dispatcher = dispatcher
		this.init()
		this.initCount()
	}

	private init(): void {
		for (let i = 0; i < 2; i++) {
			this.cloud[i] = this.fnc.createBitmapByName('cloud')
			this.cloud[i].width = egret.MainContext.instance.stage.stageWidth
			this.cloud[i].height = 400
			this.cloud[i].y = egret.MainContext.instance.stage.stageHeight - 400

			this.mountain[i] = this.fnc.createBitmapByName('bg_grass')
			this.mountain[i].width = egret.MainContext.instance.stage.stageWidth
			this.mountain[i].y =
				egret.MainContext.instance.stage.stageHeight - this.mountain[i].height

			this.grass[i] = this.fnc.createBitmapByName('flower')
			this.grass[i].width = egret.MainContext.instance.stage.stageWidth
			this.grass[i].y =
				egret.MainContext.instance.stage.stageHeight - this.grass[i].height

			this.stone[i] = this.fnc.createBitmapByName('stone')
			this.stone[i].width = egret.MainContext.instance.stage.stageWidth
			this.stone[i].y =
				egret.MainContext.instance.stage.stageHeight - this.stone[i].height
		}

		this.addChild(this.cloud[0])
		this.addChild(this.cloud[1])
		this.addChild(this.mountain[0])
		this.addChild(this.mountain[1])
		this.addChild(this.grass[0])
		this.addChild(this.grass[1])
		this.addChild(this.stone[0])
		this.addChild(this.stone[1])

		this.cloud[1].x = egret.MainContext.instance.stage.stageWidth
		this.grass[1].x = egret.MainContext.instance.stage.stageWidth
		this.mountain[1].x = egret.MainContext.instance.stage.stageWidth
		this.stone[1].x = egret.MainContext.instance.stage.stageWidth

		this.startGame()
	}

	private initCount(): void {
		this.scoreText = new egret.TextField()
		this.scoreText.text = `当前分数：${this.score}`
		this.scoreText.x = 10
		this.scoreText.y = 10
		this.addChild(this.scoreText)
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
				/*
					让每个水管的高度再次随机一次，就不会出现水管永远循环一样的高度的情况
				*/
				this.pipe[i].getChildAt(0).height = Math.floor(Math.random() * 200) + 50 //250;;
				this.pipe[i].getChildAt(1).y =
					this.pipe[i].getChildAt(0).height + this.pipe_distance_y //250;;
				this.pipe[i].getChildAt(1).height =
					egret.MainContext.instance.stage.stageHeight -
					this.pipe[i].getChildAt(1).y
			}
		}
		this.collisionTest(bird)
	}

	public startGame() {
		// 创建小水管
		for (let i = 0; i < 4; i++) {
			// 因为pipe是 egret.Sprite 类型的数组  所以它的每一项应该要是egret.Sprite() 类型
			this.pipe[i] = new egret.Sprite()
			let pipe_up = this.fnc.createBitmapByName('bamboo_up')
			let pipe_down = this.fnc.createBitmapByName('bamboo_down')
			// 设置整个容器的 x 而不是设置单个图形的 x
			this.pipe[i].x =
				egret.MainContext.instance.stage.stageWidth + i * this.pipe_distance_x
			pipe_up.height = Math.floor(Math.random() * 200) + 50
			pipe_down.y = pipe_up.height + this.pipe_distance_y
			pipe_down.height =
				egret.MainContext.instance.stage.stageHeight - pipe_down.y
			this.pipe[i].addChild(pipe_up)
			this.pipe[i].addChild(pipe_down)
			this.addChild(this.pipe[i])
		}
	}

	private detailMove(obj: egret.Bitmap[], speed) {
		for (let i = 0; i < 2; i++) {
			obj[i].x -= speed
			if (obj[i].x <= -(obj[i].width - speed)) {
				obj[i].x += 2 * obj[i].width
			}
		}
	}

	private collisionTest(bird: egret.Bitmap) {
		if (bird.y + bird.height === this.grass[0].y + 330) {
			this.store.over()
			console.log(this.store)
		}

		for (let i = 0; i < this.pipe.length; i++) {
			let pipeX = this.pipe[i].x
			let pipeY_up =
				this.pipe[i].getChildAt(0).y + this.pipe[i].getChildAt(0).height
			let pipe_down = this.pipe[i].getChildAt(1).y

			if (
				bird.x + bird.width >= pipeX - 2 &&
				bird.x + bird.width <= pipeX + 2
			) {
				if (bird.y <= pipeY_up || bird.y + bird.height >= pipe_down) {
					this.store.over()
					this.dispatcher.gameOver() // 触发游戏结束事件，让小鸟下落
					alert(`游戏结束，您的得分是${this.score}`)
				} else {
					this.score++
					this.scoreText.text = `当前分数：${this.score}`
				}
			}
		}
	}
}
