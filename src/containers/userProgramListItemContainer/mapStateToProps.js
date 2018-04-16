import { createSelector } from 'reselect'
import formatedProgramSelector from 'src/selectors/formatedProgramSelector'

export default createSelector(
	[
		formatedProgramSelector,
	],
	(
		formatedProgram
	) => ({
		name      : formatedProgram.name,
		type      : formatedProgram.type,
		createdAt : formatedProgram.createdAt.toString()
	})
)
