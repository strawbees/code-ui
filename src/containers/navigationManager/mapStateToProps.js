import { createStructuredSelector } from 'reselect'
import makeUrlVarSelector from 'src/selectors/makeUrlVarSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import refEditorHasChangesSelector from 'src/selectors/refEditorHasChangesSelector'

export default () => createStructuredSelector({
	refEditorHasChanges : refEditorHasChangesSelector(),
	queryRef            : queryRefSelector(),
	queryLocale         : queryLocaleSelector(),
	urlVarP             : makeUrlVarSelector('p'),
	urlVarU             : makeUrlVarSelector('u'),
	urlVarData          : makeUrlVarSelector('data'),
})
