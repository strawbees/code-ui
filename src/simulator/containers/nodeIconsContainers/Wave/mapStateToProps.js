import { createSelector } from 'reselect'
import internalDataNodeSelector from '../../../selectors/internalDataNodeSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeSelector(),
	],
	(
		node,
	) => ({
		id : node.id
	})
)

export default mapStateToProps
