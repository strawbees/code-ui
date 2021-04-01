import { createSelector } from 'reselect'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'

import {
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
} from '../lib/quirkbot'

const findNodes = (entities, kind) =>
	Object.values(entities).filter(node => {
		const byType = typeof kind.nodeType !== 'undefined' ? node.nodeType === kind.nodeType : true
		const byPlace = typeof kind.place !== 'undefined' ? node.place === kind.place : true
		return byType && byPlace
	})
const hasNodes = (entities, kind) => {
	if (findNodes(entities, kind).length) {
		return true
	}
	return false
}

const physicalRepresentationRenderInfoSelector = () => createSelector(
	[
		internalDataNodeEntitiesSelector(),
	],
	(
		entities,
	) => {
		let width = 480
		let height = 480
		const originScale = 1
		let originOffsetX = 0
		let originOffsetY = -20

		const increaseTopLimbs = 60
		const increaseBottomLimbs = 55
		const increaseXLimbs = 50
		const increaseYMotors = 415
		const increaseXMotors = 200
		const increaseXKeys = 400
		const increaseYKeys = 140

		let hasTopLimbs
		let hasBottomLimbs
		let hasLeftLimbs
		let hasRightLimbs
		let hasLeftMotors
		let hasRightMotors
		let hasMotors
		let hasKeys

		if (hasNodes(entities, { nodeType : 'Led', place : PLACE_HORN }) ||
			hasNodes(entities, { nodeType : 'DualColorLed', place : PLACE_HORN }) ||
			hasNodes(entities, { nodeType : 'LightSensor', place : PLACE_HORN })) {
			hasTopLimbs = true
		}
		if (hasNodes(entities, { nodeType : 'Led', place : PLACE_LEFT_ARM }) ||
			hasNodes(entities, { nodeType : 'DualColorLed', place : PLACE_LEFT_ARM }) ||
			hasNodes(entities, { nodeType : 'LightSensor', place : PLACE_LEFT_ARM })) {
			hasLeftLimbs = true
		}
		if (hasNodes(entities, { nodeType : 'Led', place : PLACE_RIGHT_ARM }) ||
			hasNodes(entities, { nodeType : 'DualColorLed', place : PLACE_RIGHT_ARM }) ||
			hasNodes(entities, { nodeType : 'LightSensor', place : PLACE_RIGHT_ARM })) {
			hasRightLimbs = true
		}
		if (hasNodes(entities, { nodeType : 'Led', place : PLACE_LEFT_LEG }) ||
			hasNodes(entities, { nodeType : 'DualColorLed', place : PLACE_LEFT_LEG }) ||
			hasNodes(entities, { nodeType : 'LightSensor', place : PLACE_LEFT_LEG }) ||
			hasNodes(entities, { nodeType : 'Led', place : PLACE_RIGHT_LEG }) ||
			hasNodes(entities, { nodeType : 'DualColorLed', place : PLACE_RIGHT_LEG }) ||
			hasNodes(entities, { nodeType : 'LightSensor', place : PLACE_RIGHT_LEG })) {
			hasBottomLimbs = true
		}
		if (hasNodes(entities, { nodeType : 'ServoMotor', place : PLACE_SERVO_MOTOR_1 }) ||
			hasNodes(entities, { nodeType : 'ContinuousServo', place : PLACE_SERVO_MOTOR_1 })) {
			hasLeftMotors = true
			hasMotors = true
		}
		if (hasNodes(entities, { nodeType : 'ServoMotor', place : PLACE_SERVO_MOTOR_2 }) ||
			hasNodes(entities, { nodeType : 'ContinuousServo', place : PLACE_SERVO_MOTOR_2 })) {
			hasRightMotors = true
			hasMotors = true
		}
		if (hasNodes(entities, { nodeType : 'KeyPress' }) ||
			hasNodes(entities, { nodeType : 'KeySequence' })) {
			hasKeys = true
		}
		// Left / Right
		if (
			(hasLeftLimbs && hasRightLimbs && hasRightMotors && hasLeftMotors) ||
			(hasRightMotors && hasLeftMotors)
		) {
			width += increaseXMotors + increaseXMotors
		} else if (
			(hasLeftLimbs && hasRightLimbs && hasRightMotors) ||
			(hasLeftLimbs && hasRightMotors)
		) {
			width += increaseXMotors + increaseXLimbs
			originOffsetX += increaseXMotors * 0.5 - increaseXLimbs * 0.5
		} else if (
			(hasRightLimbs && hasLeftLimbs && hasLeftMotors) ||
			(hasRightLimbs && hasLeftMotors)
		) {
			width += increaseXMotors + increaseXLimbs
			originOffsetX -= increaseXMotors * 0.5 - increaseXLimbs * 0.5
		} else if (
			(hasLeftLimbs && hasLeftMotors) ||
			(hasLeftMotors)
		) {
			width += increaseXMotors
			originOffsetX -= increaseXMotors * 0.5
		} else if (
			(hasRightLimbs && hasRightMotors) ||
			(hasRightMotors)
		) {
			width += increaseXMotors
			originOffsetX += increaseXMotors * 0.5
		} else if (hasLeftLimbs && hasRightLimbs) {
			width += increaseXLimbs + increaseXLimbs
		} else if (hasLeftLimbs) {
			width += increaseXLimbs
			originOffsetX -= increaseXLimbs * 0.5
		} else if (hasRightLimbs) {
			width += increaseXLimbs
			originOffsetX += increaseXLimbs * 0.5
		}

		// Top / Bottom
		if (
			(hasTopLimbs && hasBottomLimbs && hasMotors && hasKeys) ||
			(hasTopLimbs && hasMotors && hasKeys)
		) {
			height += increaseTopLimbs + increaseYMotors + increaseYKeys
			originOffsetY += increaseTopLimbs * 0.5 - increaseYMotors * 0.5 - increaseYKeys * 0.5
		} else if (
			(hasTopLimbs && hasBottomLimbs && hasMotors) ||
			(hasTopLimbs && hasMotors)
		) {
			height += increaseYMotors + increaseTopLimbs
			originOffsetY -= increaseYMotors * 0.5 - increaseTopLimbs * 0.5
		} else if (
			(hasTopLimbs && hasBottomLimbs && hasKeys) ||
			(hasTopLimbs && hasKeys)
		) {
			height += increaseTopLimbs + increaseYKeys
			originOffsetY += increaseTopLimbs * 0.5 - increaseYKeys * 0.5
		} else if (
			(hasBottomLimbs && hasMotors && hasKeys) ||
			(hasMotors && hasKeys)
		) {
			height += increaseYMotors + increaseYKeys
			originOffsetY -= increaseYMotors * 0.5 + increaseYKeys * 0.5
		} else if (
			(hasBottomLimbs && hasKeys) ||
			(hasKeys)
		) {
			height += increaseYKeys
			originOffsetY -= increaseYKeys * 0.5
		} else if (
			(hasBottomLimbs && hasMotors) ||
			(hasMotors)
		) {
			height += increaseYMotors
			originOffsetY -= increaseYMotors * 0.5
		} else if (hasTopLimbs) {
			height += increaseTopLimbs
			originOffsetY += increaseTopLimbs * 0.5
		} else if (hasBottomLimbs) {
			height += increaseBottomLimbs
			originOffsetY -= increaseBottomLimbs * 0.5
		}

		return {
			width,
			height,
			originScale,
			originOffsetX,
			originOffsetY,
		}
	}
)

export default physicalRepresentationRenderInfoSelector
