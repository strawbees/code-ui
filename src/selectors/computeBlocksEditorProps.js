import computeBlocksToolboxProps from 'src/utils/computeBlocksToolboxProps'
import computeBlocksSourceProps from 'src/utils/computeBlocksSourceProps'

export default (props, appProps) => ({
	blocksEditor : {
		...computeBlocksToolboxProps(props, appProps),
		...computeBlocksSourceProps(props, appProps)
	}
})
