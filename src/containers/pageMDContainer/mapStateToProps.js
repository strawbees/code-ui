import { createStructuredSelector } from 'reselect'
import queryIdSelector from 'src/selectors/queryIdSelector'

export default () => createStructuredSelector({
	queryId : queryIdSelector(),
})
