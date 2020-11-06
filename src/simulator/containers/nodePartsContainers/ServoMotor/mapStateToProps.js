import { createSelector } from 'reselect'
import internalDataNodeSelector from '../../../selectors/internalDataNodeSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeSelector(),
	],
	(
		node,
	) => ({
		place    : node.place,
		position : node.position,
	})
)

export default mapStateToProps
