import { createSelector } from 'reselect'
import reportNodeSelector from '../../selectors/reportNodeSelector'

const mapStateToProps = () => createSelector(
	[
		reportNodeSelector(),
	],
	(
		{
			nodeType,
			id,
		},
	) => ({
		nodeType,
		id,
	})
)

export default mapStateToProps
