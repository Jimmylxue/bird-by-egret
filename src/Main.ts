//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
	private fnc = new Fnc()

	public store = new Store()
	private dispatcher: CustomDispatcher

	public constructor() {
		super()
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
	}

	private onAddToStage(event: egret.Event) {
		egret.lifecycle.addLifecycleListener(context => {
			context.onUpdate = () => {}
		})

		egret.lifecycle.onPause = () => {
			egret.ticker.pause()
		}

		egret.lifecycle.onResume = () => {
			egret.ticker.resume()
		}

		this.runGame().catch(e => {
			console.log(e)
		})
	}

	private async runGame() {
		await this.loadResource()
		this.createGameScene()
		const result = await RES.getResAsync('description_json')
		this.startAnimation(result)
		await platform.login()
		const userInfo = await platform.getUserInfo()
		console.log(userInfo)
	}

	private async loadResource() {
		try {
			const loadingView = new LoadingUI()
			this.stage.addChild(loadingView)
			await RES.loadConfig('resource/default.res.json', 'resource/')
			await RES.loadGroup('preload', 0, loadingView)
			this.stage.removeChild(loadingView)
		} catch (e) {
			console.error(e)
		}
	}

	/**
	 * ??????????????????
	 * Create a game scene
	 */
	private createGameScene() {
		this.dispatcher = new CustomDispatcher()
		this.x = 0
		this.y = 0
		let sky = this.fnc.createBitmapByName('sky')
		this.addChild(sky)
		let bg = new Bg(this.dispatcher)
		this.addChild(bg)

		let bird = new Bird(this.dispatcher)
		this.addChild(bird)

		sky.touchEnabled = true
		sky.addEventListener(
			egret.TouchEvent.TOUCH_TAP,
			() => {
				this.store.start()
				this.dispatcher.birdLeap()
			},
			this
		)
		/*
				startTick???????????????stopTick????????????????????? 60 ????????????????????????
				
				??????????????? egret.Timer()????????????????????????????????????delay ??????????????????16.6?????????
		*/

		egret.startTick(() => {
			bird.move(this.store)
			bg.move(this.store, bird.bird)
			return false
		}, this)
		let stageW = this.stage.stageWidth
		let stageH = this.stage.stageHeight
		sky.width = stageW
		sky.height = stageH
	}

	/**
	 * ?????????????????????????????????????????????
	 * Description file loading is successful, start to play the animation
	 */
	private startAnimation(result: string[]) {}
}
