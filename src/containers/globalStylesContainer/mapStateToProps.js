import { createStructuredSelector } from 'reselect'
import rootPathSelector from 'src/selectors/rootPathSelector'

const mapStateToProps = () => createStructuredSelector({
	rootPath : rootPathSelector(),
})

export default mapStateToProps
