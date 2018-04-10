import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import * as setupActions from 'src/actions/setup'
import * as editorActions from 'src/actions/editor'

export default autobindDispatchToActionCreators({
	...setupActions,
	...editorActions
})
