import {
	Node,
	Input,
	Output,
} from './CommonNodeIncludes'

export class Constrain extends Node {
	static nodeType = 'Constrain'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Constrain.nodeType

		this.registerInput(this.in)
		this.registerInput(this.min)
		this.registerInput(this.max)

		this.in.set(0.0)
		this.min.set(0.0)
		this.max.set(1.0)
	}

	in = new Input()

	min = new Input()

	max = new Input()

	out = new Output()

	onInternalInputChange() {
		this.out.set(this.Bot.constrainValue(this.in.get(), this.min.get(), this.max.get()))
	}

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			in       : this.in.get(),
			min      : this.min.get(),
			max      : this.max.get(),
			out      : this.out.get(),
		}
	}
}
