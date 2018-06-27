import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		(state, { titleLabelKey }) => makeStringSelector(titleLabelKey)(state),
		makeStringSelector('ui.buttons.cancel'),
		makeStringSelector('ui.buttons.confirm'),
		(state, { cancelLabelKey }) => makeStringSelector(cancelLabelKey)(state),
		(state, { confirmLabelKey }) => makeStringSelector(confirmLabelKey)(state),
	],
	(
		titleLabel,
		defaultCancelLabel,
		defaultConfirmLabel,
		cancelLabel,
		confirmLabel,
	) => ({
		titleLabel,
		cancelLabel  : cancelLabel || defaultCancelLabel,
		confirmLabel : confirmLabel || defaultConfirmLabel,
	})
)
