import { createStructuredSelector } from 'reselect'
import storagePublicProfileProgramsSortedIdsSelector from 'src/selectors/storagePublicProfileProgramsSortedIdsSelector'

export default () => createStructuredSelector({
	ids : storagePublicProfileProgramsSortedIdsSelector()
})
