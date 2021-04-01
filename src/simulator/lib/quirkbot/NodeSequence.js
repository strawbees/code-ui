import {
	Node,
	Input,
	Output,
	InputCollection,
	HasTrigger,
	HasInterval,
	floor,
} from './CommonNodeIncludes'

export class Sequence extends HasTrigger(HasInterval(Node)) {
	static nodeType = 'Sequence'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Sequence.nodeType

		this.registerInput(this.duration)
		this.registerInputCollection(this.items)

		this.interval.set(0.01)
		this.duration.set(1.0)

		this.running = false
		this.selected = null
	}

	onInterval() {
		if (!this.running) return
		let position = 0
		if (this.duration.get() !== 0) {
			position = (this.Bot.seconds() - this.startTime) / this.duration.get()
		}
		if (position > 1) {
			position = 1
			this.running = false
		}
		let i = floor(position * this.items.collection.size())
		if (i === this.items.collection.size()) i = this.items.collection.size() - 1
		if (this.items.collection.get(i) !== this.selected) {
			this.selected = this.items.collection.get(i)
			this.out.set(this.selected.get())
		}
	}

	duration = new Input()

	items = new InputCollection()

	out = new Output()

	onInternalInputChange(internalInput) {
		if (internalInput === this.trigger) {
			if (!this.running && this.isTriggerActive()) {
				this.startTime = this.Bot.seconds()
				this.running = true
				this.onInterval() // start immediatelly
			}
		} else if (internalInput === this.selected) {
			this.out.set(this.selected.get())
		}
	}

	selected

	running

	startTime

	getInternalData() {
		const items = []
		for (let i = 0; i < this.items.collection.size(); i++) {
			items.push(this.items.collection.get(i).get())
		}
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			duration : this.duration.get(),
			trigger  : this.trigger.get(),
			out      : this.out.get(),
			items
		}
	}
}
