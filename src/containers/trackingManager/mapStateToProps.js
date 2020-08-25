import { createStructuredSelector } from 'reselect'
import setupAsPathSelector from 'src/selectors/setupAsPathSelector'

const mapStateToProps = () => createStructuredSelector({
	asPath : setupAsPathSelector(),
})

export default mapStateToProps
