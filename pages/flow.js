import FlowView from 'src/components/views/flow'
import withClientProps from 'src/components/hoc/withClientProps'
import selectAppProps from 'src/selectors/selectAppProps'

FlowView.getInitialProps = async (state) => {
	return {
		...state,
		...selectAppProps(state)
	}
}
FlowView.getClientProps = async (state) => {
	return {
		...state
	}
}


export default withClientProps(FlowView)
