import App from 'src/components/app'
import ScratchEditor from 'src/components/editors/scratch/index'

export default ({
	app
}) =>
	<App {...app}>
		<ScratchEditor/>
	</App>
