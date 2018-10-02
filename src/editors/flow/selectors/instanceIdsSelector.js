import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'

const CACHE = {}
export default () => createSelector(
	[
		sourceSelector(),
	],
	(
		source
	) => {
		const ids = source.map(({ id }) => id).sort()
		const key = ids.join('')
		if (!CACHE[key]) {
			CACHE[key] = ids
		}
		return CACHE[key]
	}
)
