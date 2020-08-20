import { createStructuredSelector } from 'reselect'
import instanceXSelector from 'src/editors/flow/selectors/instanceXSelector'
import instanceYSelector from 'src/editors/flow/selectors/instanceYSelector'

const mapStateToProps = () => createStructuredSelector({
	x : instanceXSelector(),
	y : instanceYSelector(),
})

export default mapStateToProps
