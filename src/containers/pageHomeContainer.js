import { connect } from 'react-redux'
import { addProgram } from 'src/utils/storage'
import PageHome from 'src/components/pageHome'

const fns = {
	addProgram
}
const PageHomeContainer = (props) =>
	<PageHome {...props}{...fns}/>

export default connect(
	null,
	null
)(PageHomeContainer)
