import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UploadArea from 'src/components/uploadArea'
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
		const {
			bootloaderUpdaterHex,
			factoryCodeHex,
			compilerBootloaderUpdaterError,
			compilerFactoryCodeError,
			...props
		} = this.props
		const hex = bootloaderUpdaterHex && factoryCodeHex
		const compilerError = compilerBootloaderUpdaterError && compilerFactoryCodeError

		return (
			<UploadArea hex={hex} compilerError={compilerError} {...props} />
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
