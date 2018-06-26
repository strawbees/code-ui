import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		stateSelector(),
		storageProgramSelector(),
		makeStringSelector('ui.editor.program.placeholder_name'),
	],
	(
		state,
		{
			id,
			name,
			type,
			updatedAt,
			createdAt
		},
		placeholderName,
	) => ({
		name      : name || placeholderName,
		url       : `${makeStringSelector(`${type}.url`)(state)}?p=${id}`,
		updatedAt : updatedAt.toString(),
		createdAt : createdAt.toString(),
		type,
	})
)
