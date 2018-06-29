import { createStructuredSelector } from 'reselect'
import makeUrlVarSelector from 'src/selectors/makeUrlVarSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'
import refEditorHasChangesSelector from 'src/selectors/refEditorHasChangesSelector'

export default () => createStructuredSelector({
	refEditorHasChanges : refEditorHasChangesSelector(),
	queryRef            : queryRefSelector(),
	urlVarP             : makeUrlVarSelector('p'),
	urlVarData          : makeUrlVarSelector('data'),
})
