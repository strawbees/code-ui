import { createStructuredSelector } from 'reselect'
import connectionLineIdsSelector from 'src/editors/flow/selectors/connectionLineIdsSelector'

export default () => createStructuredSelector({
	connectionLineIds : connectionLineIdsSelector(),
})
