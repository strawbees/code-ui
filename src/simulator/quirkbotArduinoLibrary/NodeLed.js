import {
	DISCONNECTED
} from './core/constants'
import Node from './Node'
import Input from './Input'

export class Led extends Node {
	type = 'Led'

	constructor(Bot, id) {
		super(Bot, id)

		this.registerInput(this.light)
		this.registerInput(this.place)

		this.light.set(1)
		this.place.set(DISCONNECTED)
	}

	destructor() {
		super.destructor()
	}

	light = new Input()

	place = new Input()

	report() {
		return [
			this.type,
			this.id,
			this.light.get(),
			this.place.get(),
		]
	}
}

export default Led
