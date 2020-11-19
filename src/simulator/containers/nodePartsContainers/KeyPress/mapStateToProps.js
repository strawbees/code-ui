import { createSelector } from 'reselect'
import internalDataNodeSelector from '../../../selectors/internalDataNodeSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeSelector(),
	],
	(
		node,
	) => ({
		keyValue : node.key, // Use 'keyValue' to avoid clash with React's 'key' prop
		pressed  : node.pressed,
	})
)

export default mapStateToProps
