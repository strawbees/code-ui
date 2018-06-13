import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import instanceNodeSelector from 'src/editors/flow/selectors/instanceNodeSelector'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'
import parameterNumItemsSelector from 'src/editors/flow/selectors/parameterNumItemsSelector'

export default () => createSelector(
	[
		stateSelector(),
		sourceSelector()
	],
	(
		state,
		source,
	) => {
		// Sort nodes by input > brains > output
		source = source.slice(0).sort((instanceA, instanceB) => {
			const nodeA = instanceNodeSelector()(state, { id : instanceA.id })
			const nodeB = instanceNodeSelector()(state, { id : instanceB.id })
			const categoryA = nodeA.taxonomy.category
			const categoryB = nodeB.taxonomy.category
			if (categoryA === 'input' && categoryB !== 'input') {
				return -1
			}
			if (categoryB === 'input' && categoryA !== 'input') {
				return 1
			}
			if (categoryA === 'brains' && categoryB !== 'brains') {
				return -1
			}
			if (categoryB === 'brains' && categoryA !== 'brains') {
				return 1
			}
			if (categoryA === 'output' && categoryB !== 'output') {
				return -1
			}
			if (categoryB === 'output' && categoryA !== 'output') {
				return 1
			}
			if (instanceA.name < instanceB.name) {
				return -1
			}
			if (instanceB.name < instanceA.name) {
				return 1
			}
			return 0
		})

		let code = ''
		// includes
		code += '#include "Quirkbot.h"\n'
		code += '\n'
		// declares
		code += source.map(instance => {
			const node = instanceNodeSelector()(state, { id : instance.id })
			return `${node.code} ${instance.name};`
		}).join('\n')
		code += '\n'
		code += '\n'
		// setup
		code += 'void setup(){\n'
		// connections
		code += source.map(instance => {
			const node = instanceNodeSelector()(state, { id : instance.id })
			if (!node.parameters) {
				return null
			}
			return node.parameters.map(parameter => {
				let c = ''
				if (!parameter.multiple) {
					const value = parameterValueParsedSanitisedSelector()(state, { id : parameter.id, instanceId : instance.id })
					c += `\t${instance.name}.${parameter.code}`
					if (value.type === 'OUTLET') {
						c += `.connect(${value.code});`
					} else {
						c += ` = ${value.code};`
					}
				} else {
					const numItems = parameterNumItemsSelector()(state, { id : parameter.id, instanceId : instance.id })
					c = [...Array(numItems)].map((_, num) => {
						const value = parameterValueParsedSanitisedSelector()(state, { id : `${parameter.id}.${num}`, instanceId : instance.id })
						let cc = ''
						cc += `\t${instance.name}.${parameter.code}[${num}]`
						if (value.type === 'OUTLET') {
							cc += `.connect(${value.code});`
						} else {
							cc += ` = ${value.code};`
						}
						return cc
					}).join('\n')
				}
				return c
			}).join('\n')
		}).filter(t => t).join('\n\n')
		code += '\n'
		code += '}\n'
		code += '\n'
		// loop
		code += 'void loop(){\n'
		code += '\n'
		code += '}\n'

		return code
	}
)
