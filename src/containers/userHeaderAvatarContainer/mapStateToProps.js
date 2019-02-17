import { createStructuredSelector } from 'reselect'
import storageUsernameSelector from 'src/selectors/storageUsernameSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'
import storageStatusSelector from 'src/selectors/storageStatusSelector'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'

export default () => createStructuredSelector({
	profileUrl    : makeInternalUrlStringSelector('home.url'),
	username      : storageUsernameSelector(),
	isAnon        : storageIsAnonSelector(),
	storageStatus : storageStatusSelector(),
})
