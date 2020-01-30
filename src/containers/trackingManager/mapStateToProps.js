import { createStructuredSelector } from 'reselect'
import setupAsPathSelector from 'src/selectors/setupAsPathSelector'
import setupPauseTrackingSelector from 'src/selectors/setupPauseTrackingSelector'

export default () => createStructuredSelector({
	asPath : setupAsPathSelector(),
	paused : setupPauseTrackingSelector(),
})
