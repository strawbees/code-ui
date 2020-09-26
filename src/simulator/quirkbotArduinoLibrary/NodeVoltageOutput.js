import { Led } from './NodeLed'

export class VoltageOutput extends Led {
	nodeType = 'VoltageOutput'

	constructor(...args) {
		super(...args)

		this.in = this.light
	}

	in // alias to light

	getInternalData() {
		return {
			...super.getInternalData(),
			in : this.in.get(),
		}
	}
}
