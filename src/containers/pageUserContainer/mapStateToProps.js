import { createStructuredSelector } from 'reselect'
import storagePublicProfileUsernameSelector from 'src/selectors/storagePublicProfileUsernameSelector'

export default () => createStructuredSelector({
	username : storagePublicProfileUsernameSelector(),
})
