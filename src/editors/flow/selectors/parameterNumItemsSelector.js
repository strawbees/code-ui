import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import propsInstanceIdSelector from 'src/editors/flow/selectors/propsInstanceIdSelector'
import parameterIsMultipleSelector from 'src/editors/flow/selectors/parameterIsMultipleSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

export default () => createSelector(
	[
		stateSelector(),
		propsIdSelector(),
		propsInstanceIdSelector(),
		parameterIsMultipleSelector(),

	],
	(
		state,
		id,
		instanceId,
		isMultiple,
	) => {
		if (!isMultiple) {
			return null
		}
		const instance = instanceSelector()(state, { id : instanceId })
		const parameterIds = Object.keys(instance.parameters || {})
		let num = 0
		parameterIds
			.filter(parameterId => parameterId.indexOf(`${id}.`) === 0)
			.forEach(parameterId => {
				const indexNum = parseInt(parameterId.split('.')[1], 10) + 1
				if (indexNum > num) {
					num = indexNum
				}
			})
		return num
	}
)
