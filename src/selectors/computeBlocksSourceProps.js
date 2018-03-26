import computeBlockDefinitionProps from 'src/utils/computeBlockDefinitionProps'

export default (props, appProps) => ({
	blocks : props.blocks.reduce((acc, blockProps) => {
		acc[blockProps.id] = {
			...computeBlockDefinitionProps(blockProps, appProps)
		}
		return acc
	}, {})
})
