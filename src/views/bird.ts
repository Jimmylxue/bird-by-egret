class Bird extends egret.Sprite {
  private fnc = new Fnc()

  public bird: egret.Bitmap = new egret.Bitmap

  private leapCount: number = 40
  private dropCount: number = 1

  private startGame: boolean = false

  // 定义静态变量，方便倒是碰撞检测在其他的类中能拿到
  // static postitionX: number = 0
  // static postitiony: number = 0

  constructor(dispatcher: CustomDispatcher) {
    super()

    console.log('dispatcher', dispatcher)

    if (dispatcher) {
      dispatcher.addEventListener(CustomDispatcher.CLICK, this.leap, this);
      dispatcher.addEventListener(CustomDispatcher.OVER, this.stop, this);
    }

    this.bird = this.fnc.createBitmapByName('body')
    this.bird.x = 300
    this.bird.y = egret.MainContext.instance.stage.stageHeight / 2



    this.addChild(this.bird)

    this.bird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      alert(11111)
    }, this)
  }

  public changeStatus(): void {
    this.startGame = true
    console.log('开始游戏了')
  }

  public move(store: Store): void {
    if (store.status !== Store.STAR) {
      return
    }
    this.bird.y += this.dropCount
    this.collisionTest()
  }

  private collisionTest(): void {
    // 碰撞检测
  }

  public leap(): void {
    this.bird.y -= this.leapCount
  }

  public stop(): void {
    alert('game over了')
  }

}