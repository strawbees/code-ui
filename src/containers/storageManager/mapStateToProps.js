import { createStructuredSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import storageStatusSelector from 'src/selectors/storageStatusSelector'
import storageUserSelector from 'src/selectors/storageUserSelector'
import storageRemoteMirrorSelector from 'src/selectors/storageRemoteMirrorSelector'

export default () => createStructuredSelector({
	programs     : storageProgramsSelector(),
	credentials  : storageCredentialsSelector(),
	status       : storageStatusSelector(),
	user         : storageUserSelector(),
	remoteMirror : storageRemoteMirrorSelector()
})
