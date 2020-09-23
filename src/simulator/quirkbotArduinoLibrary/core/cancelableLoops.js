export const STORE = new Map()

export const cancelAllLoops = () => {
	STORE.forEach((value) => value.cancel())
	STORE.clear()
}

export const endAllLoops = () => {
	STORE.forEach((value) => value.end())
	STORE.clear()
}

export const createWhileLoop = async (testFunction, doFunction, name) => {
	const loop = new WhileLoop(testFunction, doFunction)
	loop.name = name
	await loop.exec()
}

export const createForLoop = async (statement1, statement2, statement3, doFunction) => {
	await statement1()
	const loop = new WhileLoop(statement2, async () => {
		await doFunction()
		await statement3()
	})
	return loop.exec()
}

export class WhileLoop {
	key = null

	timer = null

	resolve = null

	reject = null

	testFunction = null

	doFunction = null

	constructor(testFunction, doFunction) {
		this.key = this

		this.testFunction = testFunction
		this.doFunction = doFunction

		STORE.set(this.key, this)
	}

	destructor() {
		clearTimeout(this.timer)
		STORE.delete(this.key)
		this.timer = null
		this.key = null
		this.resolve = null
		this.reject = null
		this.testFunction = null
		this.doFunction = null
	}

	cancel = () => {
		if (this.reject) {
			this.reject(new Error('Loop was canceled.'))
		}
		this.destructor()
	}

	end = () => {
		if (this.resolve) {
			this.resolve()
		}
		this.destructor()
	}

	exec = () => new Promise((resolve, reject) => {
		this.resolve = resolve
		this.reject = reject

		const tick = async () => {
			clearTimeout(this.timer)
			if (!await this.testFunction()) {
				resolve()
				this.destructor()
				return
			}
			try {
				await this.doFunction()
			} catch (e) {
				reject(e)
				this.destructor()
				return
			}

			this.timer = setTimeout(tick, 250)
		}
		this.timer = setTimeout(tick, 250)
	})
}
