import {
	Node,
	Input,
	Output,
} from './CommonNodeIncludes'

export const COMP_EQUAL = 0
export const COMP_DIFF = 1
export const COMP_GREATER = 2
export const COMP_GREATER_EQ = 3
export const COMP_LESS = 4
export const COMP_LESS_EQ = 5

export class Comparison extends Node {
	nodeType = 'Comparison'

	constructor(...args) {
		super(...args)

		this.registerInput(this.in)
		this.registerInput(this.operation)
		this.registerInput(this.value)
		this.registerInput(this.ifThen)
		this.registerInput(this.ifElse)

		this.in.set(0.0)
		this.operation.set(COMP_EQUAL)
		this.value.set(0.0)
		this.ifThen.set(1.0)
		this.ifElse.set(0.0)
	}

	destructor() {
		super.destructor()
	}

	in = new Input()

	operation = new Input()

	value = new Input()

	ifThen = new Input()

	ifElse = new Input()

	out = new Output()

	onInternalInputChange() {
		let result

		if (this.operation.get() === COMP_EQUAL) {
			result = this.in.get() === this.value.get()
		} else if (this.operation.get() === COMP_DIFF) {
			result = this.in.get() !== this.value.get()
		} else if (this.operation.get() === COMP_GREATER) {
			result = this.in.get() > this.value.get()
		} else if (this.operation.get() === COMP_GREATER_EQ) {
			result = this.in.get() >= this.value.get()
		} else if (this.operation.get() === COMP_LESS) {
			result = this.in.get() < this.value.get()
		} else if (this.operation.get() === COMP_LESS_EQ) {
			result = this.in.get() <= this.value.get()
		}

		this.out.set(result ? this.ifThen.get() : this.ifElse.get())
	}

	getInternalData() {
		return {
			nodeType  : this.nodeType,
			id        : this.getTypedId(),
			in        : this.in.get(),
			operation : this.operation.get(),
			value     : this.value.get(),
			ifThen    : this.ifThen.get(),
			ifElse    : this.ifElse.get(),
			out       : this.out.get(),
		}
	}
}
