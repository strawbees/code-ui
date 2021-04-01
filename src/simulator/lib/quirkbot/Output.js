import { Event } from './Event'

export class Output {
	constructor() {
		this.value = 0
	}

	destructor() {}

	/**
	 * Handle for input connections.
	 * */
	connect(input) {
		input.connect(this)
	}

	/**
	 * Getter and setter.
	 * */
	set(value) {
		this.value = value
		this.event.dispatch(value)
	}

	get() {
		return this.value
	}

	event = new Event()

	value
}
