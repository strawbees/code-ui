import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default () => createSelector(
	[
		qbmidiLinksSelector(),
	],
	(
		qbmidiLinks,
	) => true//Object.keys(qbmidiLinks).length > 0
)
