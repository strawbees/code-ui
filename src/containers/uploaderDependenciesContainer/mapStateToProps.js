import { createStructuredSelector } from 'reselect'
import rootPathSelector from 'src/selectors/rootPathSelector'
import uploaderNeedsDriverSelector from 'src/selectors/uploaderNeedsDriverSelector'
import qbserialRuntimeIdListSelector from 'src/selectors/qbserialRuntimeIdListSelector'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'
import qbmidiRuntimeIdListSelector from 'src/selectors/qbmidiRuntimeIdListSelector'
import qbmidiAvailableSelector from 'src/selectors/qbmidiAvailableSelector'
import qbmidiReadySelector from 'src/selectors/qbmidiReadySelector'

const mapStateToProps = () => createStructuredSelector({
	rootPath            : rootPathSelector(),
	uploaderNeedsDriver : uploaderNeedsDriverSelector(),
	serialBoardIds      : qbserialRuntimeIdListSelector(),
	serialAvailable     : qbserialAvailableSelector(),
	serialReady         : qbserialReadySelector(),
	midiBoardIds        : qbmidiRuntimeIdListSelector(),
	midiAvailable       : qbmidiAvailableSelector(),
	midiReady           : qbmidiReadySelector(),
})

export default mapStateToProps
