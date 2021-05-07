import { createSelector } from 'reselect'
import physicalRepresentationRenderInfoSelector from '../../selectors/physicalRepresentationRenderInfoSelector'

const mapStateToProps = () => createSelector(
	[
		physicalRepresentationRenderInfoSelector(),
	],
	(
		physicalRepresentationRenderInfo,
	) => ({
		...physicalRepresentationRenderInfo,
	})
)

export default mapStateToProps
