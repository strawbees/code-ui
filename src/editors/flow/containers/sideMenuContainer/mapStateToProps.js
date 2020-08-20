import { createStructuredSelector } from 'reselect'
import displayAdvancedNodesSelector from 'src/editors/flow/selectors/displayAdvancedNodesSelector'
import categoryIdsSelector from 'src/editors/flow/selectors/categoryIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	displayAdvancedNodes : displayAdvancedNodesSelector(),
	categoryIds          : categoryIdsSelector(),
})

export default mapStateToProps
