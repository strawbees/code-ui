import { createSelector } from 'reselect'
import propsHeadSelector from 'src/selectors/propsHead'
import propsHeaderSelector from 'src/selectors/propsHeader'
// import propsFooterSelector from 'src/selectors/propsFooter'

export default createSelector(
	[
		propsHeadSelector,
		propsHeaderSelector,
		// propsHeaderSelector,
	],
	(
		propsHead,
		propsHeader,
		// propsFooter
	) => ({
		propsHead,
		propsHeader,
		// propsFooter
	})
)
