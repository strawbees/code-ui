import { createSelector } from 'reselect'
import reportNodeSelector from '../../../selectors/reportNodeSelector'

const mapStateToProps = () => createSelector(
	[
		reportNodeSelector(),
	],
	(
		node,
	) => ({
		place : node.place,
		light : node.light,
	})
)

export default mapStateToProps
