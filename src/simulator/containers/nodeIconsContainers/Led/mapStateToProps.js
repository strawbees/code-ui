import { createSelector } from 'reselect'
import reportNodeSelector from '../../../selectors/reportNodeSelector'

const mapStateToProps = () => createSelector(
	[
		reportNodeSelector(),
	],
	(
		node,
	) => ({
		place : node.place
	})
)

export default mapStateToProps
