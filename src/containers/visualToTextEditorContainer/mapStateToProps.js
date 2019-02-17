import { createSelector } from 'reselect'
import rootPathSelector from 'src/selectors/rootPathSelector'

export default () => createSelector(
	[
		rootPathSelector(),
	],
	(
		rootPath,
	) => ({
		scriptPath : `${rootPath}/static/lib/scratch-blocks/vertical.js`,
		mediaPath  : `${rootPath}/static/lib/scratch-blocks/media/`,
	})
)
