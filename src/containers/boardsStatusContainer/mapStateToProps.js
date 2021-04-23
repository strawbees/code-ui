import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialAllowedSelector from 'src/selectors/qbserialAllowedSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'

const mapStateToProps = () => createSelector(
	[
		qbcompoundLinksSelector(),
		qbserialAvailableSelector(),
		qbserialAllowedSelector(),
		qbserialReadySelector(),
	],
	(
		qbcompoundLinks,
		available,
		allowed,
		ready,
	) => ({
		boards : Object.keys(qbcompoundLinks),
		available,
		allowed,
		ready,
	})
)

export default mapStateToProps
