export class DoWhile {
	updatable = null

	timer = null

	resolve = null

	reject = null

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

	exec = (test, fn) => new Promise((resolve, reject) => {
		this.resolve = resolve
		this.reject = reject

		const tick = async () => {
			clearTimeout(this.timer)
			if (!test()) {
				resolve()
				return
			}
			await fn()
			if (this.updatable) {
				await this.updatable.update()
			}
			this.timer = setTimeout(tick, 0)
		}
		this.timer = setTimeout(tick, 0)
	})
}

export const createDoWhile = () => new DoWhile()
