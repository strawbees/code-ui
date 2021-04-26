import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UploadAreaBootloaderUpdater from 'src/components/uploadAreaBootloaderUpdater'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class UploadAreaBootloadUpdaterContainer extends React.Component {
	// In case there's already a hex, and there's only one board connected,
	// upload straight away
	componentDidMount() {
		const {
			bootloaderUpdaterHex,
			factoryCodeHex,
			boardIds,
			uploadMutipleHexes,
			clearUploadError,
		} = this.props
		if (
			bootloaderUpdaterHex &&
			factoryCodeHex &&
			boardIds &&
			boardIds.length === 1
		) {
			uploadMutipleHexes(boardIds[0], [bootloaderUpdaterHex, factoryCodeHex])
		}
		// Always clean upload errors on mount
		clearUploadError()
	}

	// In case a hex get's compiled (and it wasn't before )and there's only
	// one board connected, upload straight away
	componentDidUpdate({
		bootloaderUpdaterHex : prevBootloaderUpdaterHex,
		factoryCodeHex : prevFactoryCodeHex
	}) {
		const {
			bootloaderUpdaterHex,
			factoryCodeHex,
			boardIds,
			uploadMutipleHexes
		} = this.props
		if (
			(
				(
					!prevBootloaderUpdaterHex &&
					bootloaderUpdaterHex &&
					factoryCodeHex
				)	||
				(
					bootloaderUpdaterHex &&
					!prevFactoryCodeHex &&
					factoryCodeHex
				)
			) &&
			boardIds &&
			boardIds.length === 1
		) {
			uploadMutipleHexes(boardIds[0], [bootloaderUpdaterHex, factoryCodeHex])
		}
	}

	render() {
		return (
			<UploadAreaBootloaderUpdater {...this.props} />
		)
	}
}

UploadAreaBootloadUpdaterContainer.propTypes = {
	boardIds             : PropTypes.arrayOf(PropTypes.string),
	bootloaderUpdaterHex : PropTypes.string,
	factoryCodeHex       : PropTypes.string,
	uploadMutipleHexes   : PropTypes.func,
	clearUploadError     : PropTypes.func,
}
const uploadAreaContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UploadAreaBootloadUpdaterContainer)

export default uploadAreaContainerConnected
