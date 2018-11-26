import { createStructuredSelector } from 'reselect'
import setupOSSelector from 'src/selectors/setupOSSelector'


export default () => createStructuredSelector({
	setupOS : setupOSSelector(),
})
