import { createSelector } from 'reselect'
import instanceIdsSelector from 'src/editors/flow/selectors/instanceIdsSelector'
import workspaceDimensionsSelector from 'src/editors/flow/selectors/workspaceDimensionsSelector'

export default () => createSelector(
	[
		instanceIdsSelector(),
		workspaceDimensionsSelector(),
	],
	(
		instanceIds,
		{ width, height }
	) => ({
		instanceIds,
		width,
		height
	})
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
