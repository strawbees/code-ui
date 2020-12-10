import { Input } from './Input'

export const HasTrigger = (superclass) => class extends superclass {
	constructor(...args) {
		super(...args)
		this.triggerNode = this

		this.triggerNode.registerInput(this.trigger)
		this.trigger.set(0)
		this.triggerThreshold = 0.95
	}

	destructor() {
		super.destructor()
	}

	trigger = new Input()

	triggerThreshold

	isTriggerActive() {
		return this.trigger.get() > this.triggerThreshold
	}

	triggerNode
}
