import {
	Node,
	Input,
	Output,
	HasInterval,
	random,
} from './CommonNodeIncludes'

export class Randomizer extends HasInterval(Node) {
	nodeType = 'Randomizer'

	constructor(...args) {
		super(...args)

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
}
