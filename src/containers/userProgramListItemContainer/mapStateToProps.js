import { createSelector } from 'reselect'
import { removeProgram } from 'src/utils/storage'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default createSelector(
	[
		(_, { id }) => id,
		storageProgramsSelector
	],
	(
		id,
		storagePrograms
	) => {
		const program = storagePrograms[id]
		return {
			name      : program.name,
			type      : program.type,
			createdAt : program.createdAt.toString(),
			// edit      : PropTypes.func,
			remove    : () => removeProgram(id),
			// duplicate : PropTypes.func,
			// share     : PropTypes.func
		}
	}
)
