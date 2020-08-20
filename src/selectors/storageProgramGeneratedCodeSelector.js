import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import generateFlowCode from 'src/editors/flow/utils/generateCode'
import generateBlockCode from 'src/editors/block/utils/generateCode'

const selector = () => createSelector(
	[
		stateSelector(),
		storageProgramSelector(),
	],
	(
		state,
		{ type, source }
	) => {
		switch (type) {
			case 'flow':
				return generateFlowCode(source, state)
			case 'block':
				return generateBlockCode(source)
			case 'text':
				return source
			default:
				return ''
		}
	}
)

export default selector
