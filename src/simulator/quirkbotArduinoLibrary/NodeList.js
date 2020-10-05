import {
	Node,
	Input,
	Output,
	InputCollection,
	floor,
} from './CommonNodeIncludes'

export class List extends Node {
	nodeType = 'List'

	constructor(...args) {
		super(...args)

		this.registerInput(this.in)
		this.registerInputCollection(this.items)

		this.in.set(0.0)
		this.selected = null
	}

	in = new Input()

	items = new InputCollection()

	out = new Output()

	onInternalInputChange(internalInput) {
		if (internalInput === this.in || !this.selected) {
			this.refreshSelected()
		}

		if (internalInput === this.selected) {
			this.out.set(this.selected.get())
		}
	}

	refreshSelected() {
		if (this.items.collection.size()) {
			let i = floor(this.in.get() * this.items.collection.size())
			if (i >= this.items.collection.size()) i = this.items.collection.size() - 1
			if (this.items.collection.get(i) !== this.selected) {
				this.selected = this.items.collection.get(i)
				this.out.set(this.selected.get())
			}
		} else {
			this.selected = null
			this.out.set(0)
		}
	}

	selected;

	getInternalData() {
		const items = []
		for (let i = 0; i < this.items.collection.size(); i++) {
			items.push(this.items.collection.get(i).get())
		}
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			in       : this.in.get(),
			out      : this.out.get(),
			items,
		}
	}
}
