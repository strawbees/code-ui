import { createStructuredSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import urlVarsSelector from 'src/selectors/urlVarsSelector'
import makeUrlVarSelector from 'src/selectors/makeUrlVarSelector'

export default () => createStructuredSelector({
	queryRef   : queryRefSelector(),
	urlVarP    : makeUrlVarSelector('p'),
	urlVarData : makeUrlVarSelector('data'),
})
