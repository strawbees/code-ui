/* eslint-disable camelcase */
import {
	BP1,
	BP2,
	DISCONNECTED,
	H,
	HB,
	HF,
	LA,
	LAB,
	LAF,
	LL,
	LLB,
	LLF,
	RA,
	RAB,
	RAF,
	RL,
	RLB,
	RLF,
} from './core/constants'

import { millis } from './core/Arduino'

import Vector from './Vector'

// Serial Report constants
export const REPORT_INTERVAL_MILLIS = 100
export const REPORT_UUID_INTERVAL_TICKS = 10
export const REPORT_START_DELIMITER = 250
export const REPORT_END_DELIMITER = 255
export const REPORT_UUID_DELIMITER = 251
export const REPORT_NUMBER_OF_NODES_DELIMITER = 252
export const REPORT_NODE_CONTENT_DELIMITER = 253

// Enums
export class BotMIDICommands {
	static Sync = 0xa

	static EnterBootloader = 0xb

	static Data = 0xd

	static ReadUUID = 0xf
}

export class BotSerialCommands {
	static EnterBootloader = 0xb
}

export class Bot {
	async start() {
		this.startTime = millis()
	}

	async afterStart() {
		// nothing to do
	}

	async update() {
		this.frames++

		for (let i = 0; i < this.updatables.size(); i++) {
			await this.updatables.get(i).update()
		}
	}

	getInternalData() {
		const data = []
		for (let i = 0; i < this.nodes.size(); i++) {
			data.push(this.nodes.get(i).getInternalData())
		}
		return data
	}

	setExternalData(data) {
		/* const data = []
		for (let i = 0; i < this.nodes.size(); i++) {
			data.push(this.nodes.get(i).getInternalData())
		}
		return data */
	}

	async interruptUpdate() {
		for (let i = 0; i < this.interruptUpdatables.size(); i++) {
			await this.interruptUpdatables.get(i).interruptUpdate()
		}

		this.interruptCount++
		if (this.interruptCount >= this.INTERUPT_COUNT_OVERFLOW) {
			this.interruptCount = 0
		}
	}

	// Utils
	map(x, inMin, inMax, outMin, outMax) {
		if (inMin === inMax) {
			return inMin
		}
		let result = ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
		if (outMin < outMax) {
			if (result < outMin) result = outMin
			else if (result > outMax) result = outMax
		} else if (result > outMin) result = outMin
		else if (result < outMax) result = outMax

		return result
	}

	constrainValue(x, min, max) {
		// Just return quick in case min and max are equal
		if (min === max) {
			return min
		}
		// In counter intuitive case min is greather than max
		if (min > max) {
			if (x > min) {
				return min
			}
			if (x < max) {
				return max
			}
			return x
		}
		// The normal case...
		if (x < min) {
			return min
		}
		if (x > max) {
			return max
		}
		return x
	}

	seconds() {
		return (millis() - this.startTime) * 0.001
	}

	minimum(a, b) {
		return Math.min(a, b)
	}

	maximum(a, b) {
		return Math.max(a, b)
	}

	locationToAnalogPin(location) {
		switch (location) {
			case LL:
				return LLB
			case RL:
				return RLB
			case RA:
				return RAB
			case H:
				return HB
			case LA:
				return LAB
			case LLB:
			case RLB:
			case RAB:
			case HB:
			case LAB:
			case BP1:
			case BP2:
				return location
			default:
				return DISCONNECTED
		}
	}

	locationToBackPin(location) {
		switch (location) {
			case LL:
				return LLB
			case RL:
				return RLB
			case RA:
				return RAB
			case H:
				return HB
			case LA:
				return LAB
			default:
				return DISCONNECTED
		}
	}

	locationToFrontPin(location) {
		switch (location) {
			case LL:
				return LLF
			case RL:
				return RLF
			case RA:
				return RAF
			case H:
				return HF
			case LA:
				return LAF
			default:
				return DISCONNECTED
		}
	}

	startTime = 0

	frames = 0

	INTERUPT_COUNT_OVERFLOW = 100

	nodes = new Vector()

	updatables = new Vector()

	interruptUpdatables = new Vector()
}
