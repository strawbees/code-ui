import { createSelector } from 'reselect'
import internalDataNodeSelector from '../../../selectors/internalDataNodeSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeSelector(),
	],
	(
		node,
	) => ({
		place     : node.place,
		speed     : node.speed,
		direction : node.direction,
	})
)

export default mapStateToProps
