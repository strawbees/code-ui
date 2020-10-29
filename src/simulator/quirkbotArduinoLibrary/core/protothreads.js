import { createWhileLoop } from './cancelableLoops'

export class Protothreads {
	STORE = {}

	THREAD = {}

	updatable

	constructor(updatable) {
		this.updatable = updatable
	}

	registerEvent = (name) => this.STORE[name] = {
		name,
		running : false,
	}

	registerBlock = (name, numArgs) => this.STORE[name] = {
		name,
		numArgs,
		args    : [],
		running : false,
	}

	getBlockArg = async (name, arg) => this.STORE[name].args[arg]

	threadBegin = async () => {}

	threadEnd = async () => {}

	eventBegin = async () => {}

	eventEnd = async () => {
		await this.yieldUntil(async () => false)
	}

	blockBegin = async () => {
		await this.yield()
	}

	blockEnd = async () => {}

	wait = async (seconds) => {
		const deadline = Date.now() + seconds * 1000
		await createWhileLoop(() => Date.now() < deadline, this.yield)
	}

	yield = async () => {
		await this.updatable.update()
	}

	yieldUntil = async (condition) => {
		await createWhileLoop(async () => !await condition(), this.yield)
	}

	waitUntil = async (condition) => {
		await createWhileLoop(async () => !await condition(), this.yield)
	}

	waitWhile = async (condition) => {
		await createWhileLoop(condition, this.yield)
	}

	initEvent = async () => {}

	scheduleEvent = async (name, ...args) => {
		if (!this.STORE[name].running) {
			this.spawnBlock(name, ...args)
				.catch(() => {})
		}
	}

	spawnBlock = async (name, ...args) => {
		await new Promise(r => setTimeout(r, 0))
		this.STORE[name].running = true
		this.STORE[name].args = args
		await this.THREAD[name](...args)
		this.STORE[name].running = false
	}
}
