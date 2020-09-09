import {
	DISCONNECTED
} from './core/constants'
import {
	Node,
	Input,
	Output,
	HasInterval
} from './CommonNodeIncludes'

export class DigitalSensor extends HasInterval(Node) {
	nodeType = 'DigitalSensor'

	constructor(...args) {
		super(...args)

		this.registerInput(this.place)
		this.registerInput(this.min)
		this.registerInput(this.max)

		this.place.set(DISCONNECTED)
		this.min.set(0)
		this.max.set(1)
	}

	destructor() {
		super.destructor()
	}

	onInterval() {
		if (this.externalData) {
			this.out.set(this.externalData.value)
		}
	}

	place = new Input()

	min = new Input()

	max = new Input()

	out = new Output()

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			place    : this.place.get(),
			min      : this.min.get(),
			max      : this.max.get(),
			out      : this.out.get(),
		}
	}
}
