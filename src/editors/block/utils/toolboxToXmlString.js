/* eslint-disable no-shadow */
/* eslint-disable indent */
const toolboxToXmlString = (toolbox) => `<xml>
	${toolbox.reduce((xml, {
		id, name, colour, secondaryColour, blocks = [], custom,
	}) => {
		xml += `<category
			${id ? `id="${id}"` : ''}
			${name ? `name="${name}"` : ''}
			${colour ? `colour="${colour}"` : ''}
			${secondaryColour ? `secondaryColour="${secondaryColour}"` : ''}
			${custom ? `custom="${custom}"` : ''}>
			${blocks && blocks.reduce((xml, { type, values = [] }) => {
				xml += `<block ${type ? `type="${type}"` : ''}>
					${values && values.reduce((xml, {
						name, type, field, value,
					}) => {
						xml += `<value name="${name}">
							<shadow type="${type}">
								<field name="${field}">${value}</field>
							</shadow>
						</value>`
						return xml
					}, '')}
				</block>`
				return xml
			}, '')}
		</category>`
		return xml
	}, '')}
</xml>`

export default toolboxToXmlString
