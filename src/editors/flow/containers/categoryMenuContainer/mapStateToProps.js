import { createStructuredSelector } from 'reselect'
import categoryColorSelector from 'src/editors/flow/selectors/categoryColorSelector'
import categoryNameSelector from 'src/editors/flow/selectors/categoryNameSelector'
import categoryIsFoldedSelector from 'src/editors/flow/selectors/categoryIsFoldedSelector'
import categoryVisibleNodeIdsSelector from 'src/editors/flow/selectors/categoryVisibleNodeIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	color   : categoryColorSelector(),
	name    : categoryNameSelector(),
	folded  : categoryIsFoldedSelector(),
	nodeIds : categoryVisibleNodeIdsSelector(),
})

export default mapStateToProps
