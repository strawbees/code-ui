import {
	DISCONNECTED
} from './core/constants'
import {
	Node,
	Input,
	Output,
	HasInterval
} from './CommonNodeIncludes'

export class AnalogSensor extends HasInterval(Node) {
	nodeType = 'AnalogSensor'

	constructor(...args) {
		super(...args)
		this.registerInput(this.place)
		this.registerInput(this.min)
		this.registerInput(this.max)

		this.place.set(DISCONNECTED)
		this.min.set(0)
		this.max.set(1)

		this.pin = DISCONNECTED
	}

	destructor() {
		super.destructor()
	}

	onInternalInputChange(internalInput) {
		if (internalInput === this.place) {
			this.pin = this.Bot.locationToAnalogPin(this.place.get())

			if (this.pin === DISCONNECTED) {
				this.pin = this.place.get()
			}
		}
	}

	onInterval() {
		if (this.pin === DISCONNECTED) return

		if (this.externalData) {
			this.out.set(this.externalData.value)
		}
	}

	place = new Input()

	min = new Input()

	max = new Input()

	out = new Output()

	pin

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
