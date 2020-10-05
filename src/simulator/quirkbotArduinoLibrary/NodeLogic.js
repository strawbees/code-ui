import {
	Node,
	Input,
	Output,
	InputCollection,
} from './CommonNodeIncludes'

export const LOGIC_AND = 0
export const LOGIC_OR = 1
export const LOGIC_XOR = 2

export class Logic extends Node {
	nodeType = 'Logic'

	constructor(...args) {
		super(...args)

		this.registerInput(this.operation)
		this.registerInputCollection(this.items)
		this.registerInput(this.close)
		this.registerInput(this.open)

		this.operation.set(LOGIC_AND)
		this.close.set(0.0)
		this.open.set(1.0)
	}

	operation = new Input()

	items = new InputCollection()

	close = new Input()

	open = new Input()

	out = new Output()

	onInternalInputChange() {
		let result

		if (this.operation.get() === LOGIC_AND) {
			result = true
			for (let i = 0; i < this.items.collection.size(); i++) {
				if (this.items.collection.get(i).get() === 0) {
					result = false
					break
				}
			}
		} else if (this.operation.get() === LOGIC_OR) {
			result = false
			for (let i = 0; i < this.items.collection.size(); i++) {
				if (this.tems.collection.get(i).get() !== 0) {
					result = true
					break
				}
			}
		} else if (this.operation.get() === LOGIC_XOR) {
			result = false
			for (let i = 0; i < this.items.collection.size(); i++) {
				if (this.items.collection.get(i).get() !== 0) {
					result = !result
				}
			}
		}

		this.out.set(result ? this.open.get() : this.close.get())
	}

	getInternalData() {
		const items = []
		for (let i = 0; i < this.items.collection.size(); i++) {
			items.push(this.items.collection.get(i).get())
		}
		return {
			nodeType  : this.nodeType,
			id        : this.getTypedId(),
			operation : this.operation.get(),
			close     : this.close.get(),
			open      : this.open.get(),
			out       : this.out.get(),
			items,
		}
	}
}
