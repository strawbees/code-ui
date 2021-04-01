import { millis } from './core/Arduino'
import { Input } from './Input'

export const HasInterval = (superclass) => class extends superclass {
	constructor(...args) {
		super(...args)
		this.intervalNode = this
		this.Bot.updatables.add(this)
		this.intervalNode.registerInput(this.interval)
		this.interval.set(0.01)
		this.nextTick = millis() + this.interval.get() * 1000
	}

	destructor() {
		this.Bot.updatables.remove(this)
		super.destructor()
	}

	update() {
		if (millis() >= this.nextTick) {
			this.nextTick += this.interval.get() * 1000
			this.onInterval()
		}
	}

	onInterval() {}

	interval = new Input()

	nextTick

	intervalNode
}
