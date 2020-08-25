import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'

const connectionLineInfosSelector = () => createSelector(
	[
		stateSelector(),
		sourceSelector(),
	],
	(
		state,
		source,
	) => {
		const infos = {}
		source.forEach((instance) =>
			Object.keys(instance.parameters || {}).forEach(parameterId => {
				// Can we parse a instance.outlet?
				const value = String(instance.parameters[parameterId])
				const valueArray = value.split('.')
				if (valueArray.length !== 2) {
					return
				}
				const [instanceId, outletId] = valueArray
				// Find the instance?
				if (!source.filter(({ id }) => id === instanceId).pop()) {
					return
				}
				// Find the outlet
				const outletIds = instanceOutletIdsSelector()(state, { id : instanceId })
				if (outletIds.indexOf(outletId) === -1) {
					return
				}
				// Found!
				const id = `${instanceId}.${outletId}>${instance.id}.${parameterId}`
				infos[id] = {
					id,
					from : {
						instanceId,
						outletId,
					},
					to : {
						instanceId : instance.id,
						parameterId
					}
				}
			})
		)
		return infos
	}
)

export default connectionLineInfosSelector
