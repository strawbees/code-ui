import { createStructuredSelector } from 'reselect'
import storageUsernameSelector from 'src/selectors/storageUsernameSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	profileUrl : makeStringSelector('home.url'),
	username   : storageUsernameSelector(),
	isAnon     : storageIsAnonSelector(),
})
