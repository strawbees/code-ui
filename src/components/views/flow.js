import PropTypes from 'prop-types'
import App from 'src/components/app'

const FlowView = ({
	propsApp
}) =>
	<App {...propsApp}>
		flow
	</App>


FlowView.propTypes = {
	propsApp : PropTypes.shape(App.propTypes)
}

export default FlowView
