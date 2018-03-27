import FlowView from 'src/components/views/flow'
import withClientProps from 'src/components/hoc/withClientProps'
import propsAppSelector from 'src/selectors/propsApp'

FlowView.getInitialProps = async (state) => {
	return {
		...state,
		propsApp : propsAppSelector(state)
	}
}
FlowView.getClientProps = async (state) => {
	return {
		...state
	}
}


export default withClientProps(FlowView)
