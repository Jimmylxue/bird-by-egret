// 继承一个派生类之后才可以 使用 this.addChild() 往canvas中画元素
class Bg extends egret.Sprite {
	private fnc = new Fnc()

	private cloud: egret.Bitmap[] = []

	private cloud_v: number = 10
	constructor() {
		super()
		for (let i = 0; i < 2; i++) {
			this.cloud[i] = this.fnc.createBitmapByName('cloud')
			this.cloud[i].width = egret.MainContext.instance.stage.stageWidth

			this.addChild(this.cloud[i])
		}

		this.init()
	}

	private init(): void {
		this.cloud[1].x = egret.MainContext.instance.stage.stageWidth

		this.addEventListener(
			egret.Event.ENTER_FRAME,
			() => {
				this.cloud[0].x -= this.cloud_v
				if (this.cloud[0].x < -egret.MainContext.instance.stage.stageWidth) {
					console.log(111)
					this.cloud[0].x = egret.MainContext.instance.stage.stageWidth
				}
				this.cloud[1].x -= this.cloud_v
				// if (this.cloud[1].x > egret.MainContext.instance.stage.stageWidth) {
				if (this.cloud[1].x < -egret.MainContext.instance.stage.stageWidth) {
					console.log(222)
					this.cloud[1].x = egret.MainContext.instance.stage.stageWidth
				}
			},
			this
		)
		// this.cloud.height = 400
		// this.addChild(this.cloud)
	}
	// init() {
	// 	this.addChild(this.cloud)
	// }
}
