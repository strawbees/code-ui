import { createStructuredSelector } from 'reselect'
import makeUrlVarSelector from 'src/selectors/makeUrlVarSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import setupAsPathSelector from 'src/selectors/setupAsPathSelector'
import refEditorHasChangesSelector from 'src/selectors/refEditorHasChangesSelector'

const mapStateToProps = () => createStructuredSelector({
	refEditorHasChanges : refEditorHasChangesSelector(),
	queryRef            : queryRefSelector(),
	queryLocale         : queryLocaleSelector(),
	asPath              : setupAsPathSelector(),
	urlVarP             : makeUrlVarSelector('p'),
	urlVarU             : makeUrlVarSelector('u'),
	urlVarData          : makeUrlVarSelector('data'),
})

export default mapStateToProps
