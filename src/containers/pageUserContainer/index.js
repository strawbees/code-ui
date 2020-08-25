import { connect } from 'react-redux'
import PageUser from 'src/components/pageUser'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageUserContainer = (props) =>
	<PageUser {...props}/>

const pageUserContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageUserContainer)

export default pageUserContainerConnected
