import { createSelector } from 'reselect'
import activeOutletLineRectsSelector from 'src/editors/flow/selectors/activeOutletLineRectsSelector'
import dropAreaRectGetterSelector from 'src/editors/flow/selectors/dropAreaRectGetterSelector'

const selector = () => createSelector(
	[
		activeOutletLineRectsSelector(),
		dropAreaRectGetterSelector(),
	],
	(
		activeOutletLineRects,
		dropAreaRectGetter,
	) => {
		if (!activeOutletLineRects) {
			return null
		}
		const {
			from,
			to,
		} = activeOutletLineRects

		const dropArea = dropAreaRectGetter()

		const x1 = (from.left + (from.width * 0.5) + dropArea.scroll.left) - dropArea.rect.x
		const y1 = (from.top + (from.height * 0.5) + dropArea.scroll.top) - dropArea.rect.y
		const x2 = (to.left + (to.width * 0.5) + dropArea.scroll.left) - dropArea.rect.x
		const y2 = (to.top + (to.height * 0.5) + dropArea.scroll.top) - dropArea.rect.y

		return {
			x1,
			x2,
			y1,
			y2,
		}
	}
)

export default selector
