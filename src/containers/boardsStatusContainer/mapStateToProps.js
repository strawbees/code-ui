import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'


export default () => createSelector(
	[
		qbcompoundLinksSelector(),
		qbserialAvailableSelector(),
		qbserialReadySelector(),
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
