class Bird extends egret.Sprite {
	private fnc = new Fnc()

	public bird: egret.Bitmap = new egret.Bitmap()

	private leapCount: number = 40
	private dropCount: number = 1

	private store: Store

	constructor(dispatcher: CustomDispatcher) {
		super()

		if (dispatcher) {
			dispatcher.addEventListener(CustomDispatcher.CLICK, this.leap, this)
			dispatcher.addEventListener(CustomDispatcher.OVER, this.gameOver, this)
		}

		this.bird = this.fnc.createBitmapByName('body')
		this.bird.x = 300
		this.bird.y = egret.MainContext.instance.stage.stageHeight / 2

		this.addChild(this.bird)

		this.bird.addEventListener(
			egret.TouchEvent.TOUCH_TAP,
			() => {
				alert(11111)
			},
			this
		)
	}

	public move(store: Store): void {
		this.store = store
		if (store.status !== Store.STAR) {
			return
		}
		this.bird.y += this.dropCount
	}

	public leap(): void {
		if (this.store.status === Store.STAR) {
			if (this.bird.y - this.leapCount <= 0) {
				this.bird.y = 0
			} else {
				this.bird.y -= this.leapCount
			}
		}
	}

	public gameOver(): void {
		/*
      游戏结束 让小鸟落地
    */
		let animate = egret.Tween.get(this.bird)
		animate.to({ y: 470 }, 3000)
	}
}
