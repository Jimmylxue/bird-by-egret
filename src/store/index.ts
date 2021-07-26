class Store {
	static PENDING: string = 'pending'
	static STAR: string = 'star'
	static OVER: string = 'over'

	public status: string
	constructor() {
		this.status = Store.PENDING
	}

	start(): void {
		if (this.status === Store.PENDING) {
			this.status = Store.STAR
		}
	}

	over(): void {
		if (this.status === Store.STAR) {
			this.status = Store.OVER
		}
	}
}
