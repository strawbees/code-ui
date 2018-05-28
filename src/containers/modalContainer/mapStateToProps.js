import { createSelector } from 'reselect'
import modalSelector from 'src/selectors/modalSelector'

export default () => createSelector(
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
