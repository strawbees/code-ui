import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OutletContainer from 'src/editors/flow/containers/outletContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const OutletListContainer = ({
	id,
	outletIds
}) =>
	<React.Fragment>
		{outletIds && outletIds.map((outletId) =>
			<OutletContainer
				key={outletId}
				id={outletId}
				instanceId={id}
			/>
		)}
	</React.Fragment>


OutletListContainer.propTypes = {
	id : PropTypes.string,
}

const outletListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(OutletListContainer)

export default outletListContainerConnected
