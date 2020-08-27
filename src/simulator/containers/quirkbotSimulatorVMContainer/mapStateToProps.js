import { createStructuredSelector } from 'reselect'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'

const mapStateToProps = () => createStructuredSelector({
	code : refEditorGeneratedCodeSelector(),
})

export default mapStateToProps
