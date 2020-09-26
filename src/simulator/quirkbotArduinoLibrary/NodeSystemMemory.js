import {
	Node,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export class SystemMemory extends HasInterval(Node) {
	nodeType = 'SystemMemory'

	constructor(...args) {
		super(...args)

		this.interval.set(0.01)
	}

	onInterval() {
		this.out.set(this.getFreeRam())
	}

	out = new Output()

	getFreeRam() {
		return 0
	}

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			out      : this.out.get(),
		}
	}
}
