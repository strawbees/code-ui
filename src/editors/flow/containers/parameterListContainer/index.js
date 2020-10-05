import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ParameterContainer from 'src/editors/flow/containers/parameterContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ParameterListContainer = ({
	id,
	parameterIds
}) =>
	<React.Fragment>
		{parameterIds && parameterIds.map((parameterId) =>
			<ParameterContainer
				key={parameterId}
				id={parameterId}
				instanceId={id}
			/>
		)}
	</React.Fragment>

ParameterListContainer.propTypes = {
	id : PropTypes.string,
}

const parameterListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ParameterListContainer)

export default parameterListContainerConnected
