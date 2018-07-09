import { createStructuredSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'

export default () => createStructuredSelector({
	programs    : storageProgramsSelector(),
	credentials : storageCredentialsSelector()
})
