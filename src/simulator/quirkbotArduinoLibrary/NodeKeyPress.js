import {
	Node,
	Input,
	HasTrigger,
	NO_KEY,
} from './CommonNodeIncludes'

export class KeyPress extends HasTrigger(Node) {
	nodeType = 'KeyPress'

	constructor(...args) {
		super(...args)

		this.registerInput(this.key)

		this.key.set(NO_KEY)

		this.currentKey = 0
		this.pressed = false
	}

	onInternalInputChange(internalInput) {
		if (internalInput === this.trigger) {
			if (!this.pressed && this.isTriggerActive()) {
				this.pressed = true
				if (this.currentKey !== NO_KEY) this.Bot.pressKey(this.currentKey)
			} else if (this.pressed && !this.isTriggerActive()) {
				this.pressed = false
				if (this.currentKey !== NO_KEY) this.Bot.releaseKey(this.currentKey)
				this.currentKey = this.key.get()
			}
		} else if (internalInput === this.key) {
			if (!this.isTriggerActive()) {
				this.currentKey = this.key.get()
			}
		}
	}

	key = new Input()

	currentKey

	pressed

	getInternalData() {
		return {
			nodeType   : this.nodeType,
			id         : this.getTypedId(),
			interval   : this.interval.get(),
			key        : this.key.get(),
			currentKey : this.currentKey,
			pressed    : this.pressed,
		}
	}
}
