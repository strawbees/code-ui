import PropTypes from 'prop-types'
import App from 'src/components/app'

const HomeView = ({
	app
}) =>
	<App {...app}>

		<div className="aaa">
			asdasd
		</div>
	</App>

HomeView.propTypes = {
	app : PropTypes.shape(App.propTypes)
}

export default HomeView
