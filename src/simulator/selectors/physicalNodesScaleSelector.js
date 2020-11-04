import { createSelector } from 'reselect'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'
import internalDataNodeIdsSelector from './internalDataNodeIdsSelector'

import {
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
} from '../quirkbotArduinoLibrary/Quirkbot'

const physicalNodesScaleSelector = () => createSelector(
	[
		internalDataNodeEntitiesSelector(),
		internalDataNodeIdsSelector(),
	],
	(
		entities,
		ids,
	) => {
		let servoCount = 0
		let keyCount = 0
		ids.forEach((id) => {
			const node = entities[id]
			switch (node.nodeType) {
				case 'ServoMotor':
					if (node.place === PLACE_SERVO_MOTOR_1 ||
						node.place === PLACE_SERVO_MOTOR_2) {
						servoCount++
					}
					break
				case 'KeyPress':
				case 'KeySequence':
					keyCount++
					break
				default:
			}
		})
		if (keyCount > 0 && servoCount >= 2) {
			return 0.5
		}
		if (servoCount >= 2) {
			return 0.6
		}
		if (keyCount > 0) {
			return 0.7
		}
		return 1
	}
)

export default physicalNodesScaleSelector
