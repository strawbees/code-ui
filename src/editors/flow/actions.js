import generateAction from 'src/utils/generateAction'
import instanceNodeCodeNameSelector from 'src/editors/flow/selectors/instanceNodeCodeNameSelector'
import nodeCodeNameSelector from 'src/editors/flow/selectors/nodeCodeNameSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import instanceByNameSelector from 'src/editors/flow/selectors/instanceByNameSelector'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'
import parameterValueDefaultSelector from 'src/editors/flow/selectors/parameterValueDefaultSelector'
import nextInstanceIdSelector from 'src/editors/flow/selectors/nextInstanceIdSelector'
import valueParsedSelector from 'src/editors/flow/selectors/valueParsedSelector'
import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_CONSTANT_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY,
	REGISTER_GET_DROP_AREA_RECT,
	SET_SOURCE,
	ADD_INSTANCE,
	REMOVE_INSTANCE,
	UPDATE_INSTANCE_NAME,
	UPDATE_INSTANCE_POSITION,
	SET_INSTANCE_PARAMETER,
	ADD_INSTANCE_PARAMETER_ITEM,
	REMOVE_INSTANCE_PARAMETER_ITEM,
} from './actionTypes'

export const setNodeDefinitions = generateAction(SET_NODE_DEFINITIONS)
export const setCategoryDefinitions = generateAction(SET_CATEGORY_DEFINITIONS)
export const setConstantDefinitions = generateAction(SET_CONSTANT_DEFINITIONS)
export const setDisplayAdancedNodes = generateAction(SET_DISPLAY_ADVANCED_NODES)
export const toggleFoldedCategory = generateAction(TOGGLE_FOLDED_CATEGORY)
export const registerGetDropAreaRect = generateAction(REGISTER_GET_DROP_AREA_RECT)
export const setSource = generateAction(SET_SOURCE)
export const addInstance = generateAction(ADD_INSTANCE)
export const removeInstance = generateAction(REMOVE_INSTANCE)
export const updateInstanceName = generateAction(UPDATE_INSTANCE_NAME)
export const updateInstancePosition = generateAction(UPDATE_INSTANCE_POSITION)
export const setInstanceParameter = generateAction(SET_INSTANCE_PARAMETER)
export const addInstanceParameterItem = generateAction(ADD_INSTANCE_PARAMETER_ITEM)
export const removeInstanceParameterItem = generateAction(REMOVE_INSTANCE_PARAMETER_ITEM)
export const safeAddInstance = ({
	id,
	name,
	nodeId,
	x = 0,
	y = 0,
}) => async (dispatch, getState) => {
	const state = getState()
	if (typeof id === 'undefined') {
		id = nextInstanceIdSelector()(state)
	}
	if (name) {
		name = sanitizeCPPVariableName(name)
	}
	if (!name || instanceByNameSelector()(state, { name })) {
		let base = nodeCodeNameSelector()(state, { id : nodeId })
		base = base.charAt(0).toLowerCase() + base.slice(1)
		base = sanitizeCPPVariableName(base)
		let count = 1
		name = `${base}${count}`
		while (instanceByNameSelector()(state, { name })) {
			count++
			name = `${base}${count}`
		}
	}
	dispatch(addInstance({
		id,
		name,
		nodeId,
		x,
		y
	}))
}
export const safeUpdateInstanceName = ({
	id,
	name
}) => async (dispatch, getState) => {
	const state = getState()
	if (name) {
		name = sanitizeCPPVariableName(name)
	}
	const getByName = () => instanceByNameSelector()(state, { name })
	const getById = () => instanceSelector()(state, { id })
	const getByNameDiff = () => getByName() && (getByName() !== getById())
	if (!name) {
		let base = instanceNodeCodeNameSelector()(state, { id })
		base = base.charAt(0).toLowerCase() + base.slice(1)
		base = sanitizeCPPVariableName(base)
		let count = 1
		name = `${base}${count}`
		while (getByNameDiff()) {
			count++
			name = `${base}${count}`
		}
	}
	if (getByNameDiff()) {
		const base = name
		let count = 1
		name = `${base}${count}`
		while (getByNameDiff()) {
			count++
			name = `${base}${count}`
		}
	}
	dispatch(updateInstanceName({
		id,
		name
	}))
}
export const safeUpdateInstanceParameterByValueCode = ({
	id,
	parameterId,
	valueCode
}) => async (dispatch, getState) => {
	const state = getState()
	// When valueCode represents an outlet, it uses the instance "name", and not
	// it's "id". So first thing we do is to try to convert anything that looks
	// like {name}.{outlet} to {id}.{outlet}
	let value = valueCode.toString()
	{
		const valueArray = value.split('.')
		if (valueArray.length === 2) {
			const [instanceName, outletId] = valueArray
			// Try to find and instance with this name
			const instance = instanceByNameSelector()(state, { name : instanceName })
			if (instance) {
				// Try to find the outlet
				const outletIds = instanceOutletIdsSelector()(state, { id : instance.id })
				if (outletIds.indexOf(outletId) !== -1) {
					// Ok! this is a valid, outlet. Update the value!
					value = `${instance.id}.${outletId}`
				}
			}
		}
	}

	// Now we try to parse the value
	const parsedValue = valueParsedSelector()(state, { value })

	if (parsedValue) {
		// If we manage to parse it, update to the raw value
		value = parsedValue.raw
	} else {
		// If we couldn't parse it, use the default value instead
		value = parameterValueDefaultSelector()(state, { id : parameterId, instanceId : id })
	}
	// Ready to dispatch
	dispatch(setInstanceParameter({
		id,
		parameterId,
		value
	}))
}
