import { createSelector } from 'reselect'
import categoryColorSelector from 'src/editors/flow/selectors/categoryColorSelector'
import categoryNameSelector from 'src/editors/flow/selectors/categoryNameSelector'
import categoryIsFoldedSelector from 'src/editors/flow/selectors/categoryIsFoldedSelector'
import categoryVisibleNodeIdsSelector from 'src/editors/flow/selectors/categoryVisibleNodeIdsSelector'

export default () => {
	const selector = createSelector(
		[
			categoryColorSelector,
			categoryNameSelector,
			categoryIsFoldedSelector,
			categoryVisibleNodeIdsSelector,
		],
		(
			color,
			name,
			folded,
			nodeIds,
		) => {
			console.log('why again')
			return ({
				color,
				name,
				folded,
				nodeIds,
			})
		}
	)
	return (state, props) => ({
		...selector(state, props)
	})
}
