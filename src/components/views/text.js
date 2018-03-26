import PropTypes from 'prop-types'
import App from 'src/components/app'

const TextView = ({
	app
}) =>
	<App {...app}>
		text
	</App>

TextView.propTypes = {
	app : PropTypes.shape(App.propTypes)
}

export default TextView
