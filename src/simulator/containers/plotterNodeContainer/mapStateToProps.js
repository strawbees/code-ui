import { createSelector } from 'reselect'
import internalDataNodeSelector from '../../selectors/internalDataNodeSelector'

const mapStateToProps = () => createSelector(
	[
		internalDataNodeSelector(),
	],
	(
		{
			nodeType,
			id,
			out,
			min,
			max,
			outMin,
			outMax,
		},
	) => ({
		nodeType,
		id,
		out : Number.parseFloat(out.toFixed(2)),
		min,
		max,
		outMin,
		outMax,
	})
)

export default mapStateToProps
