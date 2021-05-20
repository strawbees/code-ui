import { createStructuredSelector } from 'reselect'
import connectionLineIdsSelector from 'src/editors/flow/selectors/connectionLineIdsSelector'
import connectionLineActiveCoordinatesSelector from 'src/editors/flow/selectors/connectionLineActiveCoordinatesSelector'

const mapStateToProps = () => createStructuredSelector({
	connectionLineIds     : connectionLineIdsSelector(),
	activeLineCoordinates : connectionLineActiveCoordinatesSelector(),
})

export default mapStateToProps
