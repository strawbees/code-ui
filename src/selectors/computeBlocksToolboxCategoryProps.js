import applyPropsComputersToList from 'src/utils/applyPropsComputersToList'
import computeBlocksToolboxCategoryBlockProps from 'src/utils/computeBlocksToolboxCategoryBlockProps'

export default (props, appProps) => ({
	name            : props.name,
	colour          : props.color,
	secondaryColour : props.secondaryColor,
	custom          : props.custom || null,
	blocks          : props.blocks && applyPropsComputersToList(
		props.blocks, appProps,
		[computeBlocksToolboxCategoryBlockProps]
	)
})
