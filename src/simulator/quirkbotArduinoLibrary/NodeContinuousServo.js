import {
	Input,
} from './CommonNodeIncludes'

import { ServoMotor } from './NodeServoMotor'

export const DIRECTION_COUNTER_CLOCKWISE = 0
export const DIRECTION_CLOCKWISE = 1

export class ContinuousServo extends ServoMotor {
	nodeType = 'ServoMotor'

	constructor(...args) {
		super(...args)
		this.speed = this.position

		this.registerInput(this.direction)

		this.direction.set(DIRECTION_COUNTER_CLOCKWISE)
	}

	speed; // alias to position

	direction = new Input()

	getInternalData() {
		return {
			...super.getInternalData(),
			speed     : this.speed.get(),
			direction : this.direction.get(),
		}
	}
}
