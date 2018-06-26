import { createSelector } from 'reselect'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import generateBlockCode from 'src/editors/block/utils/generateCode'

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
			case 'block':
				return generateBlockCode(source)
			case 'text':
				return source
			default:
				return ''
		}
	}
)
