import { createStructuredSelector } from 'reselect'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'

const mapStateToProps = () => createStructuredSelector({
	value : refEditorGeneratedCodeSelector(),
})

export default mapStateToProps
