import { createSelector } from 'reselect'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import generateScratchCode from 'src/editors/scratch/utils/generateCode'

export default () => createSelector(
	[
		storageProgramSelector(),
	],
	(
		{ type, source }
	) => {
		switch (type) {
			case 'flow':
				return ''
			case 'scratch':
				return generateScratchCode(source)
			case 'text':
				return source
			default:
				return ''
		}
	}
)
