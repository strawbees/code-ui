import {
	Node,
	Input,
	HasInterval,
	millis,
	NO_KEY,
} from './CommonNodeIncludes'

export const QB_MAX_SIMULTANEOUS_KEYS = 20

export class KeySequence extends HasInterval(Node) {
	nodeType = 'KeySequence'

	constructor(...args) {
		super(...args)

		this.registerInput(this.key)
		this.registerInput(this.holdTime)

		for (let i = 0; i < QB_MAX_SIMULTANEOUS_KEYS; ++i) {
			this.scheduleKey[i] = 0
			this.scheduleTime[i] = 0
		}

		this.index = QB_MAX_SIMULTANEOUS_KEYS

		this.key.set(0)
		this.holdTime.set(0)
	}

	key = new Input()

	holdTime = new Input()

	onInternalInputChange(internalInput) {
		if (internalInput === this.key) {
			if (this.key.get() === NO_KEY) return

			this.index++
			if (this.index >= QB_MAX_SIMULTANEOUS_KEYS) this.index = 0

			// Check if some key needs to be dropped
			if (this.scheduleKey[this.index] && millis() < this.scheduleTime[this.index]) {
				this.Bot.releaseKey(this.scheduleKey[this.index])
			}

			const currentKey = this.key.get()
			const currentTime = millis() + this.holdTime.get() * 1000

			this.Bot.pressKey(currentKey)

			this.scheduleKey[this.index] = currentKey
			this.scheduleTime[this.index] = currentTime

			// Reset key internally to NO_KEY, so we can accept a stream of repeated
			// keys.
			this.key.value = NO_KEY
		}
	}

	onInterval() {
		/* eslint-disable no-continue */
		for (let i = 0; i < QB_MAX_SIMULTANEOUS_KEYS; ++i) {
			const key = this.scheduleKey[i]
			const time = this.scheduleTime[i]
			if (key === 0) continue
			if (millis() > time) {
				this.Bot.releaseKey(key)
				this.scheduleKey[i] = 0
			}
		}
		/* eslint-enable no-continue */
	}

	scheduleKey = new Array(QB_MAX_SIMULTANEOUS_KEYS)

	scheduleTime = new Array(QB_MAX_SIMULTANEOUS_KEYS)

	index

	getInternalData() {
		return {
			nodeType     : this.nodeType,
			id           : this.getTypedId(),
			key          : this.key.get(),
			holdTime     : this.holdTime.get(),
			index        : this.index,
			scheduleKey  : [...this.scheduleKey],
			scheduleTime : [...this.scheduleTime],
		}
	}
}
