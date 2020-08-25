import { createStructuredSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'

const mapStateToProps = () => createStructuredSelector({
	queryRef : queryRefSelector(),
})

export default mapStateToProps
