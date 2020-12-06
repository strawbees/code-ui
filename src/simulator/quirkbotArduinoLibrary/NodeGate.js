import {
	Node,
	Input,
	Output,
	HasTrigger,
} from './CommonNodeIncludes'

export class Gate extends HasTrigger(Node) {
	static nodeType = 'Gate'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Gate.nodeType

		this.registerInput(this.in)
		this.in.set(0.0)
	}

	in = new Input()

	out = new Output()

	onInternalInputChange() {
		if (this.isTriggerActive()) {
			this.out.set(this.in.get())
		}
	}

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			in       : this.in.get(),
			trigger  : this.trigger.get(),
			out      : this.out.get(),
		}
	}
}
