import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import connectionLineInfosSelector from 'src/editors/flow/selectors/connectionLineInfosSelector'
import dropAreaRectGetterSelector from 'src/editors/flow/selectors/dropAreaRectGetterSelector'
import disconnectingParameterIdSelector from 'src/editors/flow/selectors/disconnectingParameterIdSelector'

const connectionLineCoordinatesSelector = () => createSelector(
	[
		propsIdSelector(),
		connectionLineInfosSelector(),
		dropAreaRectGetterSelector(),
		disconnectingParameterIdSelector(),
	],
	(
		id,
		connectionLineInfos,
		dropAreaRectGetter,
		disconnectingParameterId,
	) => {
		const info = connectionLineInfos[id]

		const fromId = `${info.from.instanceId}.${info.from.outletId}`
		const toId = `${info.to.instanceId}.${info.to.parameterId}`

		const dropArea = dropAreaRectGetter()

		const fromEl = document.getElementById(fromId)
		const toEl = document.getElementById(toId)

		if (!dropArea.rect ||
			!fromEl ||
			!toEl) {
			return {}
		}

		const fromRect = fromEl.getBoundingClientRect()
		const toRect = toEl.getBoundingClientRect()

		const x1 = (fromRect.left + (fromRect.width * 0.5) + dropArea.scroll.left) - dropArea.rect.x
		const y1 = (fromRect.top + (fromRect.height * 0.5) + dropArea.scroll.top) - dropArea.rect.y
		const x2 = (toRect.left + (toRect.width * 0.5) + dropArea.scroll.left) - dropArea.rect.x
		const y2 = (toRect.top + (toRect.height * 0.5) + dropArea.scroll.top) - dropArea.rect.y

		return {
			x1,
			x2,
			y1,
			y2,
			inactive : toId === disconnectingParameterId
		}
	}
)

export default connectionLineCoordinatesSelector
