import { createSelector } from 'reselect'
import internalDataNodeIdsStringSelector from '../../selectors/internalDataNodeIdsStringSelector'
import internalDataNodeTypesStringSelector from '../../selectors/internalDataNodeTypesStringSelector'
import physicalNodesRenderInfoSelector from '../../selectors/physicalNodesRenderInfoSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeIdsStringSelector(),
		internalDataNodeTypesStringSelector(),
		physicalNodesRenderInfoSelector(),
	],
	(
		internalDataNodeIdsString,
		internalDataNodeTypesString,
		physicalNodesRenderInfo,
	) => ({
		internalDataNodeIdsString,
		internalDataNodeTypesString,
		...physicalNodesRenderInfo
	})
)

export default mapStateToProps
