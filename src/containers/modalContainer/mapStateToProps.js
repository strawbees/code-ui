import { createSelector } from 'reselect'
import modalSelector from 'src/selectors/modalSelector'

const mapStateToProps = () => createSelector(
	[
		modalSelector(),
	],
	(
		{
			display,
			content,
			onRequestClose,
		}
	) => ({
		display,
		content,
		onRequestClose,
	})
)

export default mapStateToProps
