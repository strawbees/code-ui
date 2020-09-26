import {
	Node,
	Output,
	HasInterval,
} from './CommonNodeIncludes'

export class Time extends HasInterval(Node) {
	nodeType = 'Time'

	constructor(...args) {
		super(...args)

		this.interval.set(0.001)
	}

	out = new Output()

	onInterval() {
		this.out.set(this.Bot.seconds())
	}
}
