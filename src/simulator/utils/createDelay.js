export class Delay {
	timer = null

	resolve = null

	reject = null

	cancel = () => {
		clearTimeout(this.timer)
		this.timer = null
		if (this.reject) {
			this.reject(new Error('Delay was cancelled.'))
		}
		this.resolve = null
		this.reject = null
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
		this.timer = setTimeout(() => {
			clearTimeout(this.timer)
			this.timer = null
			this.resolve = null
			this.reject = null
			resolve()
		}, millis)
	})
}

export const createDelay = () => new Delay()

export default createDelay
