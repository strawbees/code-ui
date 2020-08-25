import { createSelector } from 'reselect'
import instanceIdsSelector from 'src/editors/flow/selectors/instanceIdsSelector'
import workspaceDimensionsSelector from 'src/editors/flow/selectors/workspaceDimensionsSelector'

const mapStateToProps = () => createSelector(
	[
		instanceIdsSelector(),
		workspaceDimensionsSelector(),
	],
	(
		instanceIds,
		{ width, height }
	) => ({
		instanceIds,
		width,
		height
	})
)

export default mapStateToProps
