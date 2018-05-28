import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		makeStringSelector('ui.buttons.cancel'),
		makeStringSelector('ui.buttons.confirm'),
		(state, { cancelLabelKey }) => makeStringSelector(cancelLabelKey)(state),
		(state, { confirmLabelKey }) => makeStringSelector(confirmLabelKey)(state),
	],
	(
		defaultCancelLabel,
		defaultConfirmLabel,
		cancelLabel,
		confirmLabel,
	) => ({
		cancelLabel  : cancelLabel || defaultCancelLabel,
		confirmLabel : confirmLabel || defaultConfirmLabel,
	})
)
