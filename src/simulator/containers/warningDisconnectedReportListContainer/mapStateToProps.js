import { createSelector } from 'reselect'
import nodeTypesWithDisconnectedWarningStringSelector from '../../selectors/nodeTypesWithDisconnectedWarningStringSelector'

const mapStateToProps = () => createSelector(
	[
		nodeTypesWithDisconnectedWarningStringSelector(),
	],
	(
		nodeTypesString,
	) => ({
		nodeTypesString
	})
)

export default mapStateToProps
