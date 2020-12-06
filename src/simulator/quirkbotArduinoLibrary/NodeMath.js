import {
	Node,
	Input,
	Output,
	fmod,
} from './CommonNodeIncludes'

export const MATH_ADD = 0
export const MATH_SUBTRACT = 1
export const MATH_MULTIPLY = 2
export const MATH_DIVIDE = 3
export const MATH_MODULO = 4

export class Math extends Node {
	static nodeType = 'Math'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Math.nodeType

		this.registerInput(this.in)
		this.registerInput(this.operation)
		this.registerInput(this.value)

		this.in.set(0.0)
		this.operation.set(MATH_ADD)
		this.value.set(0.0)
	}

	in = new Input()

	operation = new Input()

	value = new Input()

	out = new Output()

	onInternalInputChange() {
		if (this.operation.get() === MATH_ADD) {
			this.out.set(this.in.get() + this.value.get())
			return
		}

		if (this.operation.get() === MATH_SUBTRACT) {
			this.out.set(this.in.get() - this.value.get())
			return
		}

		if (this.operation.get() === MATH_MULTIPLY) {
			this.out.set(this.in.get() * this.value.get())
			return
		}

		if (this.operation.get() === MATH_DIVIDE) {
			if (this.value.get() === 0) {
				this.out.set(0)
				return
			}
			this.out.set(this.in.get() / this.value.get())
			return
		}

		if (this.operation.get() === MATH_MODULO) {
			if (this.value.get() === 0) {
				this.out.set(0)
				return
			}
			this.out.set(fmod(this.in.get(), this.value.get()))
		}
	}

	getInternalData() {
		return {
			nodeType  : this.nodeTypeInternal,
			id        : this.getTypedId(),
			operation : this.operation.get(),
			value     : this.value.get(),
			out       : this.out.get(),
		}
	}
}
