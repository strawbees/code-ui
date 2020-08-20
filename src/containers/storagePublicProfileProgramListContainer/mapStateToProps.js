import { createStructuredSelector } from 'reselect'
import storagePublicProfileProgramsSortedIdsSelector from 'src/selectors/storagePublicProfileProgramsSortedIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	ids : storagePublicProfileProgramsSortedIdsSelector()
})

export default mapStateToProps
