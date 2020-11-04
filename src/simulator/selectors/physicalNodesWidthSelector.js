import { createSelector } from 'reselect'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'
import internalDataNodeIdsSelector from './internalDataNodeIdsSelector'

import {
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
} from '../quirkbotArduinoLibrary/Quirkbot'

const physicalNodesWidthSelector = () => createSelector(
	[
		internalDataNodeEntitiesSelector(),
		internalDataNodeIdsSelector(),
	],
	(
		entities,
		ids,
	) => {
		let width = 450
		ids.forEach((id) => {
			const node = entities[id]
			switch (node.nodeType) {
				case 'ServoMotor':
					if (node.place === PLACE_SERVO_MOTOR_1 ||
						node.place === PLACE_SERVO_MOTOR_2) {
						width = Math.max(width, 600)
					}
					break
				case 'Led':
				case 'DualColorLed':
					if (node.place === PLACE_LEFT_ARM ||
						node.place === PLACE_RIGHT_ARM) {
						width = Math.max(width, 550)
					}
					break
				case 'KeyPress':
				case 'KeySequence':
					width = Math.max(width, 600)
					break
				default:
			}
		})
		return width
	}
)

export default physicalNodesWidthSelector
