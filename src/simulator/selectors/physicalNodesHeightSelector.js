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

const physicalNodesHeightSelector = () => createSelector(
	[
		internalDataNodeEntitiesSelector(),
		internalDataNodeIdsSelector(),
	],
	(
		entities,
		ids,
	) => {
		let height = 450
		ids.forEach((id) => {
			const node = entities[id]
			switch (node.nodeType) {
				case 'ServoMotor':
					if (node.place === PLACE_SERVO_MOTOR_1 ||
						node.place === PLACE_SERVO_MOTOR_2) {
						height = Math.max(height, 600)
					}
					break
				case 'Led':
				case 'DualColorLed':
				case 'CircitTouch':
					if (node.place === PLACE_HORN) {
						height = Math.max(height, 550)
					}
					if (node.place === PLACE_LEFT_ARM ||
						node.place === PLACE_RIGHT_ARM ||
						node.place === PLACE_LEFT_LEG ||
						node.place === PLACE_RIGHT_LEG) {
						height = Math.max(height, 550)
					}
					break
				case 'KeyPress':
				case 'KeySequence':
					height = Math.max(height, 600)
					break
				default:
			}
		})
		return height
	}
)

export default physicalNodesHeightSelector
