import { createStructuredSelector } from 'reselect'
import rootPathSelector from 'src/selectors/rootPathSelector'

export default () => createStructuredSelector({
	rootPath : rootPathSelector(),
})
