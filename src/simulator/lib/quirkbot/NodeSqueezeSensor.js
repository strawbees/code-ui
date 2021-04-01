import {
	DISCONNECTED
} from './core/board'
import {
	Node,
	Input,
	Output,
	HasInterval
} from './CommonNodeIncludes'

export class SqueezeSensor extends HasInterval(Node) {
	static nodeType = 'SqueezeSensor'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = SqueezeSensor.nodeType

		this.registerInput(this.place)
		this.registerInput(this.min)
		this.registerInput(this.max)

		this.place.set(DISCONNECTED)
		this.min.set(0)
		this.max.set(1)
	}

	onInterval() {
		if (this.externalData) {
			const value = this.Bot.map(this.externalData.value, 0, 1, this.min.get(), this.max.get())
			this.out.set(value)
		}
	}

	place = new Input()

	min = new Input()

	max = new Input()

	out = new Output()

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			place    : this.place.get(),
			min      : this.min.get(),
			max      : this.max.get(),
			out      : this.out.get(),
		}
	}
}
