import {
	Node,
	Input,
	Output,
	HasInterval,
	random,
} from './CommonNodeIncludes'

export class Randomizer extends HasInterval(Node) {
	static nodeType = 'Randomizer'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Randomizer.nodeType

		this.registerInput(this.min)
		this.registerInput(this.max)

		this.min.set(0)
		this.max.set(1)
		this.interval.set(0.5)
	}

	min = new Input()

	max = new Input()

	out = new Output()

	onInterval() {
		this.out.set(this.Bot.map(
			random(1000),
			0.0, 1000.0,
			this.min.get(), this.max.get()
		))
	}

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			min      : this.min.get(),
			max      : this.max.get(),
			out      : this.out.get(),
		}
	}
}
