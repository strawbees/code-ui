import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import propsInstanceIdSelector from 'src/editors/flow/selectors/propsInstanceIdSelector'
import instanceParametersSelector from 'src/editors/flow/selectors/instanceParametersSelector'

const parameterDefinitionSelector = () => createSelector(
	[
		propsIdSelector(),
		propsInstanceIdSelector(),
		stateSelector(),
	],
	(
		id,
		instanceId,
		state
	) => {
		const [parsedId] = id.split('.')
		return instanceParametersSelector()(state, { id : instanceId })
			.filter(parameter => parameter.id === parsedId)
			.pop()
	}
)

export default parameterDefinitionSelector
