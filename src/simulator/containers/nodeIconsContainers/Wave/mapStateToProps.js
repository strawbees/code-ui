import { createSelector } from 'reselect'
import reportNodeSelector from '../../../selectors/reportNodeSelector'

const mapStateToProps = () => createSelector(
	[
		reportNodeSelector(),
	],
	(
		node,
	) => ({
		id : node.id
	})
)

export default mapStateToProps
