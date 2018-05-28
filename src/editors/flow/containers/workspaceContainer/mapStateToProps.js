import { createSelector } from 'reselect'
import instanceIdsSelector from 'src/editors/flow/selectors/instanceIdsSelector'

export default () => createSelector(
	[
		instanceIdsSelector(),
	],
	(
		instanceIds
	) => {
		console.log(instanceIds)
		return		({
			instanceIds
		})
	}
)


// import shallowEqual from 'fbjs/lib/shallowEqual'
// import { defaultMemoize, createSelectorCreator } from 'reselect'
// import instanceIdsSelector from 'src/editors/flow/selectors/instanceIdsSelector'
//
// const customCreateSelector = createSelectorCreator(defaultMemoize, shallowEqual)
//
// export default () => customCreateSelector(
// 	[
// 		instanceIdsSelector(),
// 	],
// 	(
// 		instanceIds
// 	) => instanceIds
// )
