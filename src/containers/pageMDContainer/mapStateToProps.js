import { createStructuredSelector } from 'reselect'
import queryIdSelector from 'src/selectors/queryIdSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'

const mapStateToProps = () => createStructuredSelector({
	queryRef : queryRefSelector(),
	queryId  : queryIdSelector(),
})

export default mapStateToProps
