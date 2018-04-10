import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import * as editorActions from 'src/actions/editor'
import * as programActions from 'src/actions/program'

export default autobindDispatchToActionCreators({
	...editorActions,
	...programActions
})
