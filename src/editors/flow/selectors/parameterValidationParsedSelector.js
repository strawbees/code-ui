import { createSelector } from 'reselect'
import parameterValidationSelector from 'src/editors/flow/selectors/parameterValidationSelector'
import valueParsedSelector from 'src/editors/flow/selectors/valueParsedSelector'
import stateSelector from 'src/editors/flow/selectors/stateSelector'


export default () => createSelector(
	[
		parameterValidationSelector(),
		stateSelector(),
	],
	(
		validation,
		state,
	) => {
		if (!validation) {
			return null
		}
		const { type } = validation
		let data
		switch (type) {
			case 'list':
				data = validation.data.map(value => valueParsedSelector()(state, { value }))
				break
			case 'range':
				data = {
					min : validation.data.min,
					max : validation.data.max,
				}
				break
			default:
				data = null
		}
		return {
			type,
			data,
		}
	}
)
