import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'
import instanceIconSelector from 'src/editors/flow/selectors/instanceIconSelector'
import baseConstantDefinitionsSelector from 'src/editors/flow/selectors/baseConstantDefinitionsSelector'
import propsValueSelector from 'src/editors/flow/selectors/propsValueSelector'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import icons from 'src/editors/flow/assets/icons'

export default () => createSelector(
	[
		sourceSelector(),
		baseConstantDefinitionsSelector(),
		propsValueSelector(),
		stateSelector(),
	],
	(
		source,
		constants,
		value,
		state,
	) => {
		// Convert value to string
		value = value.toString()
		// Default return value
		const defaultValue = {
			type : 'VALUE',
			text : value
		}
		if (!value) {
			return defaultValue
		}
		// Check if it is a constant
		{
			const id = constants[value]
			if (id) {
				return {
					type : 'CONSTANT',
					text : makeStringSelector(`flow.constant.${id}`)(state),
					icon : icons.constants[id]
				}
			}
		}
		// Check if is a connection
		{
			// Can we parse a instance.outlet?

			const valueArray = value.split('.')
			if (valueArray.length !== 2) {
				return defaultValue
			}
			const [intanceId, outletId] = valueArray
			// Find the instance
			const instance = source.filter(({ id }) => id === intanceId).pop()
			if (instance) {
				return defaultValue
			}
			// Find the outlet
			const outletIds = instanceOutletIdsSelector()(state, { id : intanceId })
			if (outletIds.indexOf(outletId) === -1) {
				return defaultValue
			}
			// Ok! valid connection
			return {
				type : 'CONNECTION',
				text : value,
				icon : instanceIconSelector()(state, { id : intanceId })
			}
		}
	}
)
