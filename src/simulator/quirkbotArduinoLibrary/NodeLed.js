import {
	DISCONNECTED
} from './core/board'
import {
	Node,
	Input
} from './CommonNodeIncludes'

export class Led extends Node {
	nodeType = 'Led'

	constructor(...args) {
		super(...args)

		this.registerInput(this.light)
		this.registerInput(this.place)

		this.light.set(1)
		this.place.set(DISCONNECTED)
	}

	light = new Input()

	place = new Input()

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			light    : this.light.get(),
			place    : this.place.get(),
		}
	}
}
