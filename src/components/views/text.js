import PropTypes from 'prop-types'
import App from 'src/components/app'

const TextView = ({
	propsApp
}) =>
	<App {...propsApp}>
		text
	</App>

TextView.propTypes = {
	propsApp : PropTypes.shape(App.propTypes)
}

export default TextView
