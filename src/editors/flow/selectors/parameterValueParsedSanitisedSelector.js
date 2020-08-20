import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import valueParsedSelector from 'src/editors/flow/selectors/valueParsedSelector'
import parameterValueRawSelector from 'src/editors/flow/selectors/parameterValueRawSelector'
import parameterValueDefaultSelector from 'src/editors/flow/selectors/parameterValueDefaultSelector'

const selector = () => createSelector(
	[
		stateSelector(),
		parameterValueRawSelector(),
		parameterValueDefaultSelector(),
	],
	(
		state,
		valueRaw,
		valueDefault,
	) => valueParsedSelector()(state, { value : valueRaw }) ||
		valueParsedSelector()(state, { value : valueDefault }) ||
		{}
)

export default selector
