import { createSelector } from 'reselect'
import internalDataNodeIdsStringSelector from '../../selectors/internalDataNodeIdsStringSelector'
import internalDataNodeTypesStringSelector from '../../selectors/internalDataNodeTypesStringSelector'
import physicalRepresentationRenderInfoSelector from '../../selectors/physicalRepresentationRenderInfoSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeIdsStringSelector(),
		internalDataNodeTypesStringSelector(),
		physicalRepresentationRenderInfoSelector(),
	],
	(
		internalDataNodeIdsString,
		internalDataNodeTypesString,
		physicalRepresentationRenderInfo,
	) => ({
		internalDataNodeIdsString,
		internalDataNodeTypesString,
		...physicalRepresentationRenderInfo,
	})
)

export default mapStateToProps
