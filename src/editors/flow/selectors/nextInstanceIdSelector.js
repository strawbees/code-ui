import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'

const nextInstanceIdSelector = () => createSelector(
	[
		sourceSelector(),
	],
	(
		source
	) => source.reduce((acc, node) => {
		const current = parseInt(node.id, 10)
		const parsed = parseInt(acc, 10)
		acc = parsed <= current ? (current + 1) : parsed
		return `${acc}_`
	}, '0_')
)

export default nextInstanceIdSelector
