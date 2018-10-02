import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UploaderDependencies from 'src/components/uploaderDependencies'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const UploaderDependenciesContainer = (props) =>
	<UploaderDependencies {...props}/>

UploaderDependenciesContainer.propTypes = {
	hideTitle : PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UploaderDependenciesContainer)
