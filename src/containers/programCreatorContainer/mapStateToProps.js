import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	flowUrl  : makeStringSelector('routes.flow'),
	blockUrl : makeStringSelector('routes.block'),
	textUrl  : makeStringSelector('routes.text'),
})
