import { createStructuredSelector } from 'reselect'
import displayAdvancedNodesSelector from 'src/editors/flow/selectors/displayAdvancedNodesSelector'
import categoryIdsSelector from 'src/editors/flow/selectors/categoryIdsSelector'

export default () => createStructuredSelector({
	displayAdvancedNodes : displayAdvancedNodesSelector(),
	categoryIds          : categoryIdsSelector(),
})
