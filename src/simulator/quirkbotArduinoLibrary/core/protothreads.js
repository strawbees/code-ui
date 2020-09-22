import { createWhileLoop } from './cancelableLoops'

export class Protothreads {
	STORE = {}

	updatable

	constructor(updatable) {
		this.updatable = updatable
	}

	Declare = (name, ...args) => this.STORE[name] = {
		running : false,
		args
	}

	DeclareEvent = this.Declare

	DeclareBlock = this.Declare

	Define = (name, fn) => this.STORE[name].fn = fn

	DefineEvent = this.Define

	DefineBlock = this.Define

	Init = (/* name */) => {}

	Begin = () => {}

	Sleep = async (ms) => {
		const deadline = Date.now() + ms
		await createWhileLoop(() => Date.now() < deadline, this.Yield)
	}

	WaitUntil = async (condition) => {
		await createWhileLoop(async () => !await condition(), this.Yield)
	}

	WaitWhile = async (condition) => {
		await createWhileLoop(condition, this.Yield)
	}

	WaitThread = async (name) => {
		await createWhileLoop(() => this.STORE[name].running, this.Yield)
	}

	Yield = async () => this.updatable.update()

	YieldUntil = async (condition) => {
		await createWhileLoop(async () => !await condition(), this.Yield)
	}

	Spawn = async (name, ...args) => {
		this.STORE[name].running = true
		await this.STORE[name].fn(...args)
		this.STORE[name].running = false
	}

	// Restart = () => {}

	Exit = () => {}

	End = () => {}

	Schedule = (name, ...args) => {
		if (!this.STORE[name].running) {
			this.STORE[name].fn(...args)
		}
	}

	BeginEvent = () => {}

	BeginBlock = () => {}

	EndEvent = () => {}

	EndBlock = () => {}
}
