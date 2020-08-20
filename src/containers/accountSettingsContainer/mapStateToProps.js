import { createStructuredSelector } from 'reselect'
import storagePublicProfileUrlSelector from 'src/selectors/storagePublicProfileUrlSelector'
import storageIsAnonSelector from 'src/selectors/storageIsAnonSelector'
import uiAccountSettingsOpenSelector from 'src/selectors/uiAccountSettingsOpenSelector'

const mapStateToProps = () => createStructuredSelector({
	publicProfileUrl : storagePublicProfileUrlSelector(),
	isAnon           : storageIsAnonSelector(),
	isOpen           : uiAccountSettingsOpenSelector(),
})

export default mapStateToProps
