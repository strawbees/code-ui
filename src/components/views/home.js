import PropTypes from 'prop-types'
import App from 'src/components/app'

const HomeView = ({
	propsApp
}) =>
	<App {...propsApp}>

		<div className="aaa">
			asdasd
		</div>
	</App>

HomeView.propTypes = {
	propsApp : PropTypes.shape(App.propTypes)
}

export default HomeView
