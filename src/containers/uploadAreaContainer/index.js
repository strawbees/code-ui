import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UploadArea from 'src/components/uploadArea'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class UploadAreaContainer extends React.Component {
	// In case there's already a hex, and there's only one board connected,
	// upload straight away
	componentDidMount() {
		const {
			hex,
			boardIds,
			uploadHex
		} = this.props
		if (
			hex &&
			boardIds &&
			boardIds.length === 1
		) {
			uploadHex(boardIds[0], hex)
		}
	}
	// In case a hex get's compiled (and it wasn't before )and there's only
	// one board connected, upload straight away
	componentDidUpdate({ hex : prevHex }) {
		const {
			hex,
			boardIds,
			uploadHex
		} = this.props
		if (
			!prevHex &&
			hex &&
			boardIds &&
			boardIds.length === 1
		) {
			uploadHex(boardIds[0], hex)
		}
	}
	render() {
		return (
			<UploadArea {...this.props} />
		)
	}
}


UploadAreaContainer.propTypes = {
	code     : PropTypes.string,
	boardIds : PropTypes.arrayOf(PropTypes.string),
	hex      : PropTypes.string,
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UploadAreaContainer)
