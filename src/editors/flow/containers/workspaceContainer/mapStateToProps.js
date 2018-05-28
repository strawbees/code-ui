import { createStructuredSelector } from 'reselect'
import instanceIdsSelector from 'src/editors/flow/selectors/instanceIdsSelector'

export default () => createStructuredSelector({
	instanceIds : instanceIdsSelector(),
})


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
