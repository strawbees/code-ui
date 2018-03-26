import PropTypes from 'prop-types'
import App from 'src/components/app'

const FlowView = ({
	app
}) =>
	<App {...app}>
		flow
	</App>


FlowView.propTypes = {
	app : PropTypes.shape(App.propTypes)
}

export default FlowView
