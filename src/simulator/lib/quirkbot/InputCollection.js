import { Input } from './Input'
import { Output } from './Output'
import { Vector } from './Vector'

export class InputCollection {
	constructor() {
		this.node = null
	}

	// Getter
	get(idx) {
		while (this.collection.size() <= idx) {
			this.registerNewInput()
		}
		return this.collection.get(idx)
	}

	add(outputOrValue) {
		const input = this.registerNewInput()
		if (outputOrValue instanceof Output) {
			input.connect(outputOrValue)
		} else {
			input.set(outputOrValue)
		}
	}

	clear() {
		while (this.collection.size()) {
			this.collection.get(0).disconnect()
			this.collection.get(0).destructor()
			this.collection.removeAt(0)
		}
	}

	collection = new Vector()

	node

	registerNewInput() {
		const input = new Input()
		this.node.registerInput(input)
		this.collection.add(input)
		return input
	}
}
