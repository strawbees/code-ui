import ScratchView from 'src/components/views/scratch'
import withClientProps from 'src/components/hoc/withClientProps'
import propsAppSelector from 'src/selectors/propsApp'
import propsScratchEditorSelector from 'src/selectors/propsScratchEditor'

ScratchView.getInitialProps = async (state) => {
	return {
		...state,
		propsApp : propsAppSelector(state)
	}
}
ScratchView.getClientProps = async (state) => {
	return {
		...state,
		// recaulculate app props as this page uses client side url vars
		propsApp           : propsAppSelector(state),
		propsScratchEditor : propsScratchEditorSelector(state)
	}
}


export default withClientProps(ScratchView)
