import { createStructuredSelector } from 'reselect'
import setupDisplayCookieNoticeSelector from 'src/selectors/setupDisplayCookieNoticeSelector'
import setupPauseTrackingSelector from 'src/selectors/setupPauseTrackingSelector'

export default () => createStructuredSelector({
	displayCookieNotice : setupDisplayCookieNoticeSelector(),
	pauseTracking       : setupPauseTrackingSelector(),
})
