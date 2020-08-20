import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

const mapStateToProps = () => createSelector(
	[
		urlVarsSelector()
	],
	(
		urlVars
	) => ({
		token : urlVars.t
	})
)

export default mapStateToProps
