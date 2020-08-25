import { createStructuredSelector } from 'reselect'
import instanceNameSelector from 'src/editors/flow/selectors/instanceNameSelector'

const mapStateToProps = () => createStructuredSelector({
	name : instanceNameSelector(),
})

export default mapStateToProps
