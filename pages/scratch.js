import ScratchView from 'src/components/views/scratch'
import withClientProps from 'src/components/hoc/withClientProps'
import selectAppProps from 'src/selectors/selectAppProps'
import selectScratchEditorProps from 'src/selectors/selectScratchEditorProps'

ScratchView.getInitialProps = async (state) => {
	return {
		...state,
		...selectAppProps(state)
	}
}
ScratchView.getClientProps = async (state) => {
	return {
		...state,
		...selectAppProps(state),
		...selectScratchEditorProps(state)
	}
}


export default withClientProps(ScratchView)
