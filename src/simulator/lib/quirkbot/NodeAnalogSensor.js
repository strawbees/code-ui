import {
	DISCONNECTED,
} from './core/board'
import {
	Node,
	Input,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export class AnalogSensor extends HasInterval(Node) {
	static nodeType = 'AnalogSensor'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = AnalogSensor.nodeType

		this.registerInput(this.place)
		this.registerInput(this.min)
		this.registerInput(this.max)

		this.place.set(DISCONNECTED)
		this.min.set(0)
		this.max.set(1)

		this.pin = DISCONNECTED
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
			this.out.set(this.Bot.map(
				this.externalData.value,
				0,
				1,
				this.min.get(),
				this.max.get()
			))
		}
	}

	place = new Input()

	min = new Input()

	max = new Input()

	out = new Output()

	pin

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
