import HomeView from 'src/components/views/home'
import withClientProps from 'src/components/hoc/withClientProps'
import selectAppProps from 'src/selectors/selectAppProps'

HomeView.getInitialProps = async (state) => {
	return {
		...state,
		...selectAppProps(state)
	}
}
HomeView.getClientProps = async (state) => {
	return {
		...state
	}
}


export default withClientProps(HomeView)
