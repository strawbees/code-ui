import {
	DISCONNECTED,
} from './core/board'
import {
	Node,
	Input,
	HasInterval,
} from './CommonNodeIncludes'

export class ServoMotor extends HasInterval(Node) {
	static nodeType = 'ServoMotor'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = ServoMotor.nodeType

		this.registerInput(this.position)
		this.registerInput(this.place)
		this.registerInput(this.iddleTime)

		this.interval.set(0.1)
		this.position.set(0.5)
		this.place.set(DISCONNECTED)
		this.iddleTime.set(1.5)
	}

	position = new Input()

	place = new Input()

	iddleTime = new Input()

	getInternalData() {
		return {
			nodeType  : this.nodeTypeInternal,
			id        : this.getTypedId(),
			interval  : this.interval.get(),
			position  : this.position.get(),
			place     : this.place.get(),
			iddleTime : this.iddleTime.get(),
		}
	}
}
