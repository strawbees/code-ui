import {
	Node,
	Input,
	Output,
	HasTrigger
} from './CommonNodeIncludes'

export class Counter extends HasTrigger(Node) {
	static nodeType = 'Counter'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Counter.nodeType

		this.registerInput(this.amount)

		this.amount.set(1.0)

		this.count = 0.0
		this.active = false
	}

	amount = new Input()

	out = new Output()

	onInternalInputChange(internalInput) {
		if (internalInput === this.trigger) {
			if (!this.active && this.isTriggerActive()) {
				this.active = true
				this.count += this.amount.get()
				this.out.set(this.count)
			} else if (this.active && !this.isTriggerActive()) {
				this.active = false
			}
		}
	}

	count;

	active;

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			trigger  : this.trigger.get(),
			amount   : this.amount.get(),
			out      : this.out.get()
		}
	}
}
