import applyPropsComputersToList from 'src/utils/applyPropsComputersToList'
import computeBlocksToolboxCategoryProps from 'src/utils/computeBlocksToolboxCategoryProps'

export default (props, appProps) => ({
	toolbox : props.settings[0] && props.settings[0].toolbox && applyPropsComputersToList(
		props.settings[0].toolbox, appProps,
		[computeBlocksToolboxCategoryProps]
	)
})
