import { connect } from 'react-redux'
import AppContainer from 'src/containers/appContainer'

const FlowPageContainer = () =>
	<AppContainer>
		Flow!
	</AppContainer>

export default connect()(FlowPageContainer)
