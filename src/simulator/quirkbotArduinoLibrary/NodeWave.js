import {
	Node,
	Input,
	Output,
	HasInterval,
	floor,
} from './CommonNodeIncludes'

import {
	WAVE_RAMP_DOWN_TABLE,
	WAVE_RAMP_UP_TABLE,
	WAVE_PULSE_TABLE,
	WAVE_TRIANGLE_TABLE,
	WAVE_SQUARE_TABLE,
	WAVE_SINE_TABLE,
} from './WaveTables'

export const WAVE_SINE = 0
export const WAVE_SQUARE = 1
export const WAVE_TRIANGLE = 2
export const WAVE_PULSE = 3
export const WAVE_RAMP_UP = 4
export const WAVE_RAMP_DOWN = 5

export class Wave extends HasInterval(Node) {
	static nodeType = 'Wave'

	constructor(...args) {
		super(...args)
		this.nodeTypeInternal = Wave.nodeType

		this.registerInput(this.length)
		this.registerInput(this.min)
		this.registerInput(this.max)
		this.registerInput(this.offset)
		this.registerInput(this.type)

		this.position = 0

		this.interval.set(0.033)
		this.length.set(1.0)
		this.min.set(0)
		this.max.set(1)
		this.offset.set(0.0)
		this.type.set(WAVE_SINE)
	}

	destructor() {
		super.destructor()
	}

	onInterval() {
		if (this.length.get() === 0) {
			return
		}
		const timeSeconds = (this.Bot.seconds() - this.adjust + this.offset.get() * this.length.get()) % this.length.get()
		if (this.length.get() !== 0) {
			this.position = timeSeconds / this.length.get()
		} else {
			this.position = 0
		}

		const index = floor(this.position * 256.0)
		this.out.set(
			this.Bot.map(
				this.table[index],
				0.0,
				255.0,
				this.min.get(),
				this.max.get()
			)
		)
	}

	length = new Input()

	min = new Input()

	max = new Input()

	offset = new Input()

	type = new Input()

	out = new Output()

	table;

	onInternalInputChange(internalInput) {
		if (internalInput === this.type) {
			const t = this.type.get()

			if (t >= WAVE_RAMP_DOWN) {
				this.table = WAVE_RAMP_DOWN_TABLE
			} else if (t >= WAVE_RAMP_UP) {
				this.table = WAVE_RAMP_UP_TABLE
			} else if (t >= WAVE_PULSE) {
				this.table = WAVE_PULSE_TABLE
			} else if (t >= WAVE_TRIANGLE) {
				this.table = WAVE_TRIANGLE_TABLE
			} else if (t >= WAVE_SQUARE) {
				this.table = WAVE_SQUARE_TABLE
			} else if (t >= WAVE_SINE) {
				this.table = WAVE_SINE_TABLE
			}
		} else if (internalInput === this.length) {
			let basePosition = this.position - this.offset.get()
			if (basePosition < 0) basePosition += 1

			const currentTime = this.Bot.seconds() % this.length.get()
			if (this.length.get() === 0) {
				this.adjust = 0
				return
			}
			let diff = 0
			if (this.length.get() !== 0) {
				diff = currentTime / this.length.get() - basePosition
			}
			this.adjust = diff * this.length.get()
		}
	}

	adjust;

	position;

	getInternalData() {
		return {
			nodeType : this.nodeTypeInternal,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			length   : this.length.get(),
			min      : this.min.get(),
			max      : this.max.get(),
			offset   : this.offset.get(),
			type     : this.type.get(),
			out      : this.out.get(),
		}
	}
}
