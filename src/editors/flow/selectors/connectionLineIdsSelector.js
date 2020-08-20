import { createSelector } from 'reselect'
import connectionLineInfosSelector from 'src/editors/flow/selectors/connectionLineInfosSelector'

const CACHE = {}
const selector = () => createSelector(
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

export default selector
