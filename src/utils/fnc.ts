class Fnc {
	public createBitmapByName(name: string) {
		let result = new egret.Bitmap()
		let texture: egret.Texture = RES.getRes(name)
		result.texture = texture
		return result
	}
}
