import {
	BP2,
	BP4,
} from './core/board'
import {
	Node,
	Input,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export const QB_IR_PROXIMITY_OUTPUT_PIN = BP4
export const QB_IR_PROXIMITY_INPUT_PIN = BP2
export const QB_IR_PROXIMITY_MAX = 120

export class IRProximity extends HasInterval(Node) {
	static nodeType = 'IRProximity'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = IRProximity.nodeType

		this.registerInput(this.min)
		this.registerInput(this.max)

		this.min.set(0)
		this.max.set(1)
		this.interval.set(0.05)
	}

	onInterval() {
		if (this.externalData) {
			this.out.set(this.Bot.map(this.externalData.value, 0, QB_IR_PROXIMITY_MAX, this.min.get(), this.max.get()))
		}
	}

	min = new Input()

	max = new Input()

	out = new Output()

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
