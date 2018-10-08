import { createStructuredSelector } from 'reselect'
import queryIdSelector from 'src/selectors/queryIdSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'

export default () => createStructuredSelector({
	queryRef : queryRefSelector(),
	queryId  : queryIdSelector(),
})
