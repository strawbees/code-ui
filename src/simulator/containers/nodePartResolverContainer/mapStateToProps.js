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
		},
	) => ({
		nodeType,
		id,
	})
)

export default mapStateToProps
