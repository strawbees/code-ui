import HomeView from 'src/components/views/home'
import withClientProps from 'src/components/hoc/withClientProps'
import propsAppSelector from 'src/selectors/propsApp'

HomeView.getInitialProps = async state => ({
	...state,
	propsApp : propsAppSelector(state)
})

HomeView.getClientProps = async state => state


export default withClientProps(HomeView)
