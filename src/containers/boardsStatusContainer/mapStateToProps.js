import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'
// import qbmidiAvailableSelector from 'src/selectors/qbmidiAvailableSelector'
// import qbmidiReadySelector from 'src/selectors/qbmidiReadySelector'


export default () => createSelector(
	[
		qbcompoundLinksSelector(),
		qbserialAvailableSelector(),
		qbserialReadySelector(),
		// qbmidiAvailableSelector(),
		// qbmidiReadySelector(),
	],
	(
		qbcompoundLinks,
		available,
		ready,
	) => ({
		boards : Object.keys(qbcompoundLinks),
		available,
		ready,
	})
)
