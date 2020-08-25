import { connect } from 'react-redux'
import LocalesMenu from 'src/components/localesMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const LocalesMenuContainer = (props) =>
	<LocalesMenu {...props}/>

const localesMenuContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(LocalesMenuContainer)

export default localesMenuContainerConnected
