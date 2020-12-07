import { Led } from './NodeLed'

export class VoltageOutput extends Led {
	static nodeType = 'VoltageOutput'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = VoltageOutput.nodeType

		this.in = this.light
	}

	in // alias to light

	getInternalData() {
		return {
			...super.getInternalData(),
			nodeType : this.nodeTypeInternal,
			in       : this.in.get(),
		}
	}
}
