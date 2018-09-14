import { createSelector } from 'reselect'
import setupOSSelector from 'src/selectors/setupOSSelector'

export default () => createSelector(
	[
		setupOSSelector(),
	],
	(
		platform,
	) => platform &&
		platform.os &&
		platform.os.family &&
		platform.os.family.indexOf('Windows') !== -1 &&
		platform.os.version.indexOf('10') !== 0
)
