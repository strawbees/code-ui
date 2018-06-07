import { createSelector } from 'reselect'
import connectionLineInfosSelector from 'src/editors/flow/selectors/connectionLineInfosSelector'

const CACHE = {}
export default () => createSelector(
	[
		connectionLineInfosSelector(),
	],
	(
		connectionLineInfos,
	) => {
		const ids = Object.keys(connectionLineInfos)
		const key = ids.join('')
		if (!CACHE[key]) {
			CACHE[key] = ids
		}
		return CACHE[key]
	}
)
