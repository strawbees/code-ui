import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	flowUrl  : makeStringSelector('flow.url'),
	blockUrl : makeStringSelector('block.url'),
	textUrl  : makeStringSelector('text.url'),
})
