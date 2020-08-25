import { createStructuredSelector } from 'reselect'
import storagePublicProfileUsernameSelector from 'src/selectors/storagePublicProfileUsernameSelector'

const mapStateToProps = () => createStructuredSelector({
	username : storagePublicProfileUsernameSelector(),
})

export default mapStateToProps
