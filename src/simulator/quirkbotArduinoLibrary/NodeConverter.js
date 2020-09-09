import {
	Node,
	Input,
	Output,
} from './CommonNodeIncludes'

export class Converter extends Node {
	nodeType = 'Converter'

	constructor(...args) {
		super(...args)

		this.registerInput(this.in)
		this.registerInput(this.inMin)
		this.registerInput(this.inMax)
		this.registerInput(this.outMin)
		this.registerInput(this.outMax)

		this.in.set(0.0)
		this.inMin.set(0.0)
		this.inMax.set(1.0)
		this.outMin.set(0.0)
		this.outMax.set(1.0)
	}

	destructor() {
		super.destructor()
	}

	in = new Input()

	inMin = new Input()

	inMax = new Input()

	outMin = new Input()

	outMax = new Input()

	out = new Output()

	onInternalInputChange() {
		this.out.set(
			this.Bot.map(
				this.in.get(),
				this.inMin.get(),
				this.inMax.get(),
				this.outMin.get(),
				this.outMax.get()
			)
		)
	}

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			inMin    : this.inMin.get(),
			inMax    : this.inMax.get(),
			outMin   : this.outMin.get(),
			outMax   : this.outMax.get(),
			out      : this.out.get()
		}
	}
}
