import {
	DISCONNECTED
} from './core/board'
import {
	Node,
	Input
} from './CommonNodeIncludes'

export class DualColorLed extends Node {
	static nodeType = 'DualColorLed'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = DualColorLed.nodeType

		this.registerInput(this.place)
		this.registerInput(this.light)
		this.registerInput(this.color)

		this.light.set(1)
		this.color.set(0)
		this.place.set(DISCONNECTED)
	}

	place = new Input()

	light = new Input()

	color = new Input()

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			light    : this.light.get(),
			place    : this.place.get(),
			color    : this.color.get(),
		}
	}
}
