import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const mapStateToProps = () => createStructuredSelector({
	string : (state, { value }) => makeStringSelector(value)(state),
})

export default mapStateToProps
