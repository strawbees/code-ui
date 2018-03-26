import ScratchView from 'src/components/views/scratch'
import withClientProps from 'src/components/hoc/withClientProps'
import selectAppProps from 'src/selectors/selectAppProps'

ScratchView.getInitialProps = async (state) => {
	return {
		...state,
		...selectAppProps(state)
	}
}
ScratchView.getClientProps = async (state) => {
	return {
		...state
	}
}


export default withClientProps(ScratchView)
