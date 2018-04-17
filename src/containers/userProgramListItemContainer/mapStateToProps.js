import { createSelector } from 'reselect'
import formatedProgramSelector from 'src/selectors/formatedProgramSelector'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default createSelector(
	[
		formatedProgramSelector,
		qbmidiLinksSelector,
	],
	(
		formatedProgram,
		qbmidiLinks,
	) => ({
		name          : formatedProgram.name,
		type          : formatedProgram.type,
		createdAt     : formatedProgram.createdAt.toString(),
		uploadEnabled : Object.keys(qbmidiLinks).length > 0
	})
)
