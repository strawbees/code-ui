import {
	Node,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export class SystemMemory extends HasInterval(Node) {
	static nodeType = 'SystemMemory'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = SystemMemory.nodeType

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
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			out      : this.out.get(),
		}
	}
}
