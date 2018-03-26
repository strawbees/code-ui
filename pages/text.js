import TextView from 'src/components/views/text'
import withClientProps from 'src/components/hoc/withClientProps'
import selectAppProps from 'src/selectors/selectAppProps'

TextView.getInitialProps = async (state) => {
	return {
		...state,
		...selectAppProps(state),
	}
}
TextView.getClientProps = async (state) => {
	return {
		...state
	}
}


export default withClientProps(TextView)
