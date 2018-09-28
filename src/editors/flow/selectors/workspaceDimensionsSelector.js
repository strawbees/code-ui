import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import instanceNodeSelector from 'src/editors/flow/selectors/instanceNodeSelector'
import stateSelector from 'src/editors/flow/selectors/stateSelector'

export default () => createSelector(
	[
		stateSelector(),
		sourceSelector(),
	],
	(
		state,
		source,
	) => {
		let instanceY
		let width = 0
		let height = 0
		source.forEach(instance => {
			if (instance.x > width) {
				width = instance.x
			}
			if (instance.y > height) {
				height = instance.y
				instanceY = instance
			}
		})
		if (!width || !height) {
			return {
				width,
				height
			}
		}

		// no need to mesure the insance horizontally, as the size is somewhat
		// fixed...
		width += 200

		// but we need to calculate the height, and that will be based on the
		// number of parameters
		const nodeY = instanceNodeSelector()(state, { id : instanceY.id })
		// "header"
		height += 100
		// "footer"
		height += 130
		if (nodeY.parameters) {
			// parameters
			height += nodeY.parameters.length * 45
			// "multiple" parameters
			height += nodeY.parameters.reduce((acc, parameter) => {
				if (parameter.multiple) {
					acc += Object.keys(instanceY.parameters || [])
						.filter(name => name.indexOf(`${parameter.id}.`) === 0)
						.length * 30
				}
				return acc
			}, 0)
		}

		return {
			width,
			height
		}
	}
)
