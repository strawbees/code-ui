import PropTypes from 'prop-types'
import App from 'src/components/app'
import ScratchEditor from 'src/components/editors/scratch/index'

const ScratchView = ({
	app,
	scratchEditor
}) =>
	<App {...app}>
		<ScratchEditor {...scratchEditor}/>
	</App>


ScratchView.propTypes = {
	app           : PropTypes.shape(App.propTypes),
	scratchEditor : PropTypes.shape(ScratchEditor.propTypes)
}

export default ScratchView
