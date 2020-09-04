import { createSelector } from 'reselect'
import reportNodeSelector from '../../selectors/reportNodeSelector'

const mapStateToProps = () => createSelector(
	[
		reportNodeSelector(),
	],
	(
		node,
	) => node
)

export default mapStateToProps
