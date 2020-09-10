import {
	Node,
	Input,
	Output,
	InputCollection,
} from './CommonNodeIncludes'

export const STAT_AVG = 0
export const STAT_MIN = 1
export const STAT_MAX = 2
export const STAT_SUM = 3

export class Statistics extends Node {
	nodeType = 'Statistics'

	constructor(...args) {
		super(...args)

		this.registerInput(this.operation)
		this.registerInputCollection(this.items)

		this.operation.set(STAT_AVG)
	}

	operation = new Input()

	items = new InputCollection()

	out = new Output()

	onInternalInputChange() {
		if (this.operation.get() === STAT_AVG) {
			let sum = 0.0
			for (let i = 0; i < this.items.collection.size(); i++) {
				sum += this.items.collection.get(i).get()
			}
			if (this.items.collection.size() > 0) {
				this.out.set(sum / this.items.collection.size())
			} else {
				this.out.set(sum)
			}
			return
		}

		if (this.operation.get() === STAT_SUM) {
			let sum = 0.0
			for (let i = 0; i < this.items.collection.size(); i++) {
				sum += this.items.collection.get(i).get()
			}
			this.out.set(sum)
			return
		}

		if (this.operation.get() === STAT_MIN) {
			let ref = 3.4028235E+38
			for (let i = 0; i < this.items.collection.size(); i++) {
				if (this.items.collection.get(i).get() < ref) ref = this.items.collection.get(i).get()
			}
			this.out.set(ref)
			return
		}

		if (this.operation.get() === STAT_MAX) {
			let ref = 0.0
			for (let i = 0; i < this.items.collection.size(); i++) {
				if (this.items.collection.get(i).get() > ref) ref = this.items.collection.get(i).get()
			}
			this.out.set(ref)
		}
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
			out       : this.out.get(),
			items,
		}
	}
}
