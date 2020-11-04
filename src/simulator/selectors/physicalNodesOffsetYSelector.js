import { createSelector } from 'reselect'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'
import internalDataNodeIdsSelector from './internalDataNodeIdsSelector'

import {
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
} from '../quirkbotArduinoLibrary/Quirkbot'

const physicalNodesOffsetYSelector = () => createSelector(
	[
		internalDataNodeEntitiesSelector(),
		internalDataNodeIdsSelector(),
	],
	(
		entities,
		ids,
	) => {
		let offsetY = 450
		ids.forEach((id) => {
			const node = entities[id]
			switch (node.nodeType) {
				case 'ServoMotor':
					if (node.place === PLACE_SERVO_MOTOR_1 ||
						node.place === PLACE_SERVO_MOTOR_2) {
						offsetY = Math.max(offsetY, 600)
					}
					break
				case 'Led':
				case 'DualColorLed':
				case 'CircitTouch':
					if (node.place === PLACE_HORN) {
						offsetY = Math.max(offsetY, 550)
					}
					if (node.place === PLACE_LEFT_ARM ||
						node.place === PLACE_RIGHT_ARM ||
						node.place === PLACE_LEFT_LEG ||
						node.place === PLACE_RIGHT_LEG) {
						offsetY = Math.max(offsetY, 550)
					}
					break
				case 'KeyPress':
				case 'KeySequence':
					offsetY = Math.max(offsetY, 600)
					break
				default:
			}
		})
		return offsetY
	}
)

export default physicalNodesOffsetYSelector
