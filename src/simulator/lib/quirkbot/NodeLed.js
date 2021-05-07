import {
	DISCONNECTED,
} from './core/board'
import {
	Node,
	Input,
} from './CommonNodeIncludes'

export class Led extends Node {
	static nodeType = 'Led'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Led.nodeType

		this.registerInput(this.light)
		this.registerInput(this.place)

		this.light.set(1)
		this.place.set(DISCONNECTED)
	}

	light = new Input()

	place = new Input()

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			light    : this.light.get(),
			place    : this.place.get(),
		}
	}
}
