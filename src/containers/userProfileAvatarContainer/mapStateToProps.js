import { createStructuredSelector } from 'reselect'
import storageUsernameSelector from 'src/selectors/storageUsernameSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'

const mapStateToProps = () => createStructuredSelector({
	username : storageUsernameSelector(),
	isAnon   : storageIsAnonSelector(),
})

export default mapStateToProps
