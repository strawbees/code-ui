import { createStructuredSelector } from 'reselect'
import storageUsernameSelector from 'src/selectors/storageUsernameSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'

export default () => createStructuredSelector({
	username : storageUsernameSelector(),
	isAnon   : storageIsAnonSelector(),
})
