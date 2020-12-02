import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import rootPathSelector from 'src/selectors/rootPathSelector'
import isSimulatorVisibleSelector from 'src/simulator/selectors/isSimulatorVisibleSelector'

const mapStateToProps = () => createSelector(
	[
		refEditorSourceSelector(),
		queryLocaleSelector(),
		localeStringsSelector(),
		rootPathSelector(),
		isSimulatorVisibleSelector(),
	],
	(
		refEditorSource,
		queryLocale,
		localeStrings,
		rootPath,
		isSimulatorVisible,
	) => ({
		refEditorSource,
		key       : `${queryLocale}`,
		strings   : localeStrings,
		mediaPath : `${rootPath}/static/lib/scratch-blocks/media/`,
		isSimulatorVisible,
	})
)

export default mapStateToProps
