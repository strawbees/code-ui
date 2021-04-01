import {
	DISCONNECTED
} from './core/board'
import {
	Node,
	Input,
	Output,
	Updatable
} from './CommonNodeIncludes'

export const QB_CIRCUIT_TOUCH_MAX_TIME = 10000
export const QB_CIRCUIT_TOUCH_DISCHARGE_TIME = 1000

export class CircuitTouch extends Updatable(Node) {
	static nodeType = 'CircuitTouch'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = CircuitTouch.nodeType

		this.registerInput(this.place)
		this.registerInput(this.min)
		this.registerInput(this.max)
		this.registerInput(this.sensitivity)

		this.place.set(DISCONNECTED)
		this.min.set(0)
		this.max.set(1)
		this.sensitivity.set(0)
	}

	place = new Input()

	min = new Input()

	max = new Input()

	sensitivity = new Input()

	out = new Output()

	update() {
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

	getInternalData() {
		return {
			nodeType    : this.nodeTypeInternal,
			id          : this.getTypedId(),
			place       : this.place.get(),
			min         : this.min.get(),
			max         : this.max.get(),
			sensitivity : this.sensitivity.get(),
			out         : this.out.get(),
		}
	}
}
