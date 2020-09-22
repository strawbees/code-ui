export class DelayMs {
	updatable = null

	timer = null

	resolve = null

	reject = null

	constructor(updatable) {
		this.updatable = updatable
	}

	registerUpdatable = (updatable) => {
		this.updatable = updatable
	}

	cancel = () => {
		clearTimeout(this.timer)
		this.timer = null
		if (this.reject) {
			this.reject(new Error('Delay was cancelled.'))
		}
		this.resolve = null
		this.reject = null
		this.updatable = null
	}

	end = () => {
		clearTimeout(this.timer)
		this.timer = null
		if (this.resolve) {
			this.resolve()
		}
		this.resolve = null
		this.reject = null
	}

	exec = (millis = 0) => new Promise((resolve, reject) => {
		this.resolve = resolve
		this.reject = reject
		millis = window.parseInt(millis)
		if (!millis) {
			this.resolve = null
			this.reject = null
			resolve()
			return
		}
		const deadline = Date.now() + millis
		const tick = async () => {
			clearTimeout(this.timer)
			if (this.updatable) {
				await this.updatable.update()
			}
			if (Date.now() >= deadline) {
				this.timer = null
				this.resolve = null
				this.reject = null
				resolve()
				return
			}
			this.timer = setTimeout(tick, 0)
		}
		this.timer = setTimeout(tick, 0)
	})
}

export class DelayUs extends DelayMs {
	exec = (us = 0) => {
		const millis = us * 0.001
		return super.exec(millis)
	}
}

export const createDelay = () => new DelayMs()

export const createDelayMicroseconds = () => new DelayUs()
