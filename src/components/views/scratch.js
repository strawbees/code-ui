import PropTypes from 'prop-types'
import App from 'src/components/app'
import ScratchEditor from 'src/components/editors/scratch/index'

const ScratchView = ({
	propsApp,
	propsScratchEditor
}) =>
	<App {...propsApp}>
		<ScratchEditor {...propsScratchEditor}/>
	</App>


ScratchView.propTypes = {
	propsApp           : PropTypes.shape(App.propTypes),
	propsScratchEditor : PropTypes.shape(ScratchEditor.propTypes)
}

export default ScratchView
