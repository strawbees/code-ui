import { connect } from 'react-redux'
import PageMD from 'src/components/pageMD'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageMDContainer = (props) =>
	<PageMD {...props}/>

const pageMDContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageMDContainer)

export default pageMDContainerConnected
