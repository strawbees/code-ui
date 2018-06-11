import { createStructuredSelector } from 'reselect'
import connectionLineIdsSelector from 'src/editors/flow/selectors/connectionLineIdsSelector'
import connectionLineActiveCoordinatesSelector from 'src/editors/flow/selectors/connectionLineActiveCoordinatesSelector'

export default () => createStructuredSelector({
	connectionLineIds     : connectionLineIdsSelector(),
	activeLineCoordinates : connectionLineActiveCoordinatesSelector()
})
