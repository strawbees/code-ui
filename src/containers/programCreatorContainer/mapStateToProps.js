import { createStructuredSelector } from 'reselect'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'

export default () => createStructuredSelector({
	flowUrl  : makeInternalUrlStringSelector('flow.url'),
	blockUrl : makeInternalUrlStringSelector('block.url'),
	textUrl  : makeInternalUrlStringSelector('text.url'),
})
