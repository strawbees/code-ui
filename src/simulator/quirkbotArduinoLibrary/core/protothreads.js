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

	Init = async (/* name */) => {}

	Begin = async () => {}

	Sleep = async (ms) => {
		const deadline = Date.now() + ms
		await createWhileLoop(() => Date.now() < deadline, this.Yield, 'sleep '+Date.now())
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

	Yield = async () => {
		await this.updatable.update()
	}

	YieldUntil = async (condition) => {
		await createWhileLoop(async () => !await condition(), this.Yield, 'Yield '+Date.now())
	}

	Spawn = async (name, ...args) => {
		this.STORE[name].running = true
		await this.STORE[name].fn(...args)
		this.STORE[name].running = false
	}

	Restart = async () => {}

	Exit = async () => {}

	End = async () => {}

	Schedule = async (name, ...args) => {
		if (!this.STORE[name].running) {
			this.Spawn(name, ...args)
		}
	}

	BeginEvent = async () => {
		await this.Begin()
	}

	BeginBlock = async () => {
		await this.Begin()
		await this.Yield()
	}

	EndEvent = async () => {
		await this.YieldUntil(async () => false)
		await this.End()
		console.log('Event ended')
	}

	EndBlock = async () => {
		await this.Exit()
		await this.End()
		console.log('Block ended')
	}
}
