import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import generateCode from 'src/editors/flow/utils/generateCode'

export default () => createSelector(
	[
		stateSelector(),
		sourceSelector()
	],
	(
		state,
		source,
	) => generateCode(source, state)
)
