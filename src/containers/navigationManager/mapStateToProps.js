import { createStructuredSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

export default () => createStructuredSelector({
	queryRef : queryRefSelector(),
	urlVars  : urlVarsSelector(),
})
