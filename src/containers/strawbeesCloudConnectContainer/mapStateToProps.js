import { createStructuredSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default () => createStructuredSelector({
	programs : storageProgramsSelector(),
})
