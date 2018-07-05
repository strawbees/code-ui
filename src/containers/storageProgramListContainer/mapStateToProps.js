import { createStructuredSelector } from 'reselect'
import storageProgramsSortedIdsSelector from 'src/selectors/storageProgramsSortedIdsSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	title : makeStringSelector('ui.program_list.title.storage'),
	ids   : storageProgramsSortedIdsSelector()
})
