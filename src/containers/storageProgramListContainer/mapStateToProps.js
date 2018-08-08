import { createStructuredSelector } from 'reselect'
import storageProgramsSortedIdsSelector from 'src/selectors/storageProgramsSortedIdsSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'

export default () => createStructuredSelector({
	isAnon : storageIsAnonSelector(),
	// title  : makeStringSelector('ui.program_list.title.storage'),
	ids    : storageProgramsSortedIdsSelector()
})
