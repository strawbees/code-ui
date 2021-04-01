import {
	DISCONNECTED,
} from './core/board'

import {
	Node,
	Input,
} from './CommonNodeIncludes'

export class RGBLed extends Node {
	static nodeType = 'RGBLed'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = RGBLed.nodeType

		this.registerInput(this.in)
		this.registerInput(this.pinR)
		this.registerInput(this.pinG)
		this.registerInput(this.pinB)
		this.registerInput(this.hue)
		this.registerInput(this.saturation)

		this.in.set(0.0)
		this.pinR.set(DISCONNECTED)
		this.pinG.set(DISCONNECTED)
		this.pinB.set(DISCONNECTED)
		this.saturation.set(1)
		this.hue.set(1)
	}

	in = new Input()

	pinR = new Input()

	pinG = new Input()

	pinB = new Input()

	hue = new Input()

	saturation = new Input()

	getInternalData() {
		return {
			nodeType   : this.nodeTypeInternal,
			id         : this.getTypedId(),
			pinR       : this.pinR.get(),
			pinG       : this.pinG.get(),
			pinB       : this.pinB.get(),
			hue        : this.hue.get(),
			saturation : this.saturation.get(),
		}
	}
}
