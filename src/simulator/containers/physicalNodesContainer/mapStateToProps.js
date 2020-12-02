import { createSelector } from 'reselect'
import physicalNodesRenderInfoSelector from '../../selectors/physicalNodesRenderInfoSelector'

const mapStateToProps = () => createSelector(
	[
		physicalNodesRenderInfoSelector(),
	],
	(
		physicalNodesRenderInfo,
	) => ({
		...physicalNodesRenderInfo
	})
)

export default mapStateToProps
