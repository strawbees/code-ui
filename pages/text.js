import TextView from 'src/components/views/text'
import withClientProps from 'src/components/hoc/withClientProps'
import propsAppSelector from 'src/selectors/propsApp'

TextView.getInitialProps = async (state) => {
	return {
		...state,
		propsApp : propsAppSelector(state)
	}
}
TextView.getClientProps = async (state) => {
	return {
		...state
	}
}


export default withClientProps(TextView)
