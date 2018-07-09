import { createStructuredSelector } from 'reselect'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'

export default () => createStructuredSelector({
	isAnon : storageIsAnonSelector()
})
