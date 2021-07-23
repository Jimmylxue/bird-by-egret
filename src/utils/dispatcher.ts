class CustomDispatcher extends egret.EventDispatcher {

  public static OVER: string = "gameover";
  public static CLICK: string = "click";
  public static START: string = "gamestart";

  constructor() {
    super()
  }

  public gameOver(): void {
    this.dispatchEventWith(CustomDispatcher.OVER);
  }

  public startGame(): void {
    this.dispatchEventWith(CustomDispatcher.START);
  }

  public birdLeap(): void {
    this.dispatchEventWith(CustomDispatcher.CLICK);
  }
}