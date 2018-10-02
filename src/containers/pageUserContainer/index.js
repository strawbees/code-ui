import { connect } from 'react-redux'
import PageUser from 'src/components/pageUser'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageUserContainer = (props) =>
	<PageUser {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageUserContainer)
