import { createStructuredSelector } from 'reselect'
import storageProgramsSortedIdsSelector from 'src/selectors/storageProgramsSortedIdsSelector'

export default () => createStructuredSelector({
	ids : storageProgramsSortedIdsSelector()
})
