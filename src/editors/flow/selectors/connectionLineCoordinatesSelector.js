import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import connectionLineInfosSelector from 'src/editors/flow/selectors/connectionLineInfosSelector'
import dropAreaRectGetterSelector from 'src/editors/flow/selectors/dropAreaRectGetterSelector'

export default () => createSelector(
	[
		propsIdSelector(),
		connectionLineInfosSelector(),
		dropAreaRectGetterSelector(),
	],
	(
		id,
		connectionLineInfos,
		dropAreaRectGetter,
	) => {
		const info = connectionLineInfos[id]

		const fromId = `${info.from.instanceId}.${info.from.outletId}`
		const toId = `${info.to.instanceId}.${info.to.parameterId}`

		const dropArea = dropAreaRectGetter()

		const fromRect = document.getElementById(fromId).getBoundingClientRect()
		const toRect = document.getElementById(toId).getBoundingClientRect()

		const x1 = (fromRect.left + (fromRect.width * 0.5) + dropArea.scroll.left) - dropArea.rect.x
		const y1 = (fromRect.top + (fromRect.height * 0.5) + dropArea.scroll.top) - dropArea.rect.y
		const x2 = (toRect.left + (toRect.width * 0.5) + dropArea.scroll.left) - dropArea.rect.x
		const y2 = (toRect.top + (toRect.height * 0.5) + dropArea.scroll.top) - dropArea.rect.y

		return {
			x1,
			x2,
			y1,
			y2,
		}
	}
)
