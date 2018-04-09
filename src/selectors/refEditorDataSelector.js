import { createSelector } from 'reselect'
import editorSelector from 'src/selectors/editorSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'

export default createSelector(
	[
		editorSelector,
		queryRefSelector,
	],
	(
		editor,
		queryRef
	) => editor[queryRef]
)
