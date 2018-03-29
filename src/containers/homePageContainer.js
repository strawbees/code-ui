import { connect } from 'react-redux'
import AppContainer from 'src/containers/appContainer'

const HomePageContainer = () =>
	<AppContainer>
		Home!
	</AppContainer>

export default connect()(HomePageContainer)
