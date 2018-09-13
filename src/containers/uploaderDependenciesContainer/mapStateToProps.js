import { createStructuredSelector } from 'reselect'
import setupOSSelector from 'src/selectors/setupOSSelector'
import qbserialRuntimeIdListSelector from 'src/selectors/qbserialRuntimeIdListSelector'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'
import qbmidiRuntimeIdListSelector from 'src/selectors/qbmidiRuntimeIdListSelector'
import qbmidiAvailableSelector from 'src/selectors/qbmidiAvailableSelector'
import qbmidiReadySelector from 'src/selectors/qbmidiReadySelector'


export default () => createStructuredSelector({
	os              : setupOSSelector(),
	serialBoardIds  : qbserialRuntimeIdListSelector(),
	serialAvailable : qbserialAvailableSelector(),
	serialReady     : qbserialReadySelector(),
	midiBoardIds    : qbmidiRuntimeIdListSelector(),
	midiAvailable   : qbmidiAvailableSelector(),
	midiReady       : qbmidiReadySelector(),
})
