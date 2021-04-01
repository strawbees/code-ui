import {
	Node,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export class Time extends HasInterval(Node) {
	static nodeType = 'Time'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Time.nodeType

		this.interval.set(0.001)
	}

	out = new Output()

	onInterval() {
		this.out.set(this.Bot.seconds())
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
