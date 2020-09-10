import {
	DISCONNECTED,
} from './core/board'
import {
	Node,
	Input,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export class Sonar extends HasInterval(Node) {
	nodeType = 'Sonar'

	constructor(...args) {
		super(...args)

		this.registerInput(this.meters)
		this.registerInput(this.place)
		this.registerInput(this.min)
		this.registerInput(this.max)

		this.meters.set(4)
		this.place.set(DISCONNECTED)
		this.min.set(0)
		this.max.set(1)
	}

	onInterval() {
		if (this.externalData) {
			this.out.set(this.Bot.map(this.externalData.centimeters, 0, this.meters.get() * 100, this.min.get(), this.max.get()))
		}
	}

	meters = new Input()

	place = new Input()

	min = new Input()

	max = new Input()

	out = new Output()

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			meters   : this.meters.get(),
			place    : this.place.get(),
			min      : this.min.get(),
			max      : this.max.get(),
			out      : this.out.get(),
		}
	}
}
