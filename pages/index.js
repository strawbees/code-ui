import HomeView from 'src/components/views/home'
import withClientProps from 'src/components/hoc/withClientProps'
import selectAppProps from 'src/selectors/selectAppProps'

HomeView.getInitialProps = async state => ({
	...state,
	...selectAppProps(state)
})

HomeView.getClientProps = async state => state


export default withClientProps(HomeView)
