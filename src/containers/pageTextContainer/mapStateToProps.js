import { createStructuredSelector } from 'reselect'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

const mapStateToProps = () => createStructuredSelector({
	source : refEditorSourceSelector(),
})

export default mapStateToProps
