import { createStructuredSelector } from 'reselect'
import storageUsernameSelector from 'src/selectors/storageUsernameSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'
import storageStatusSelector from 'src/selectors/storageStatusSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	profileUrl    : makeStringSelector('routes.home'),
	username      : storageUsernameSelector(),
	isAnon        : storageIsAnonSelector(),
	storageStatus : storageStatusSelector(),
})
