import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import rootPathSelector from 'src/selectors/rootPathSelector'

const selector = (key, showKeyIfMissing) => createSelector(
	[
		makeStringSelector(key, showKeyIfMissing),
		rootPathSelector()
	],
	(
		string,
		rootPath
	) => `${rootPath}${string}`
)

export default selector
