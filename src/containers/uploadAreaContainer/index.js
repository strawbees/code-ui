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
			boards,
			uploadHex
		} = this.props
		if (
			hex &&
			boards &&
			boards.length === 1
		) {
			uploadHex(boards[0], hex)
		}
	}
	// In case a hex is compiled and there's only one board connected,
	// upload straight away
	componentDidUpdate({ hex : prevHex }) {
		const {
			hex,
			boards,
			uploadHex
		} = this.props
		if (
			!prevHex &&
			hex &&
			boards &&
			boards.length === 1
		) {
			uploadHex(boards[0], hex)
		}
	}
	render() {
		return (
			<UploadArea {...this.props} />
		)
	}
}


UploadAreaContainer.propTypes = {
	code : PropTypes.string
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UploadAreaContainer)
