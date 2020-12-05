import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import loadCppParser from 'src/utils/loadCppParser'

import generateJsfromCppAst from '../../utils/generateJsfromCppAst'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

import workerTemplate from '!!raw-loader!./workerTemplate.js'
import quirkbotArduinoLibrary from '!!raw-loader!static/lib/quirkbot-arduino-library/quirkbot-arduino-library.js'

const SimulatorVMManager = ({
	rootPath,
	code,
	externalData,
	setInternalData,
}) => {
	const workerRef = useRef()
	const onMessageHandlerRef = useRef()
	const handleInternalDataTimerRef = useRef()

	const externalDataRef = useRef()
	useEffect(() => {
		externalDataRef.current = externalData
	}, [externalData, code])

	const [parser, setParser] = useState(null)
	useEffect(() => {
		const loadParser = async () => {
			const loadedParser = await loadCppParser(rootPath)
			setParser(loadedParser)
		}
		loadParser()
	}, [])

	// useEffect(() => {
	// 	const workerTemplateWithQuirkbot = workerTemplate.replace('/* {{QuirkbotArduinoLibrary}} */', quirkbotArduinoLibrary)
	// 	workerRef.current = new Worker(URL.createObjectURL(new Blob([workerTemplateWithQuirkbot], { type : 'text/javascript' })))
	// 	onMessageHandlerRef.current = (e) => {
	// 		// if (e.origin !== 'null' || e.source !== iframe.contentWindow) {
	// 		// 	return
	// 		// }
	// 		const { data } = e
	// 		if (data.key === 'internalData') {
	// 			setInternalData(data.value)
	// 		}
	// 	}
	// 	window.addEventListener('message', onMessageHandlerRef.current)
	// 	return () => {
	// 		workerRef.current.terminate()
	// 		workerRef.current = null
	// 		window.removeEventListener('message', onMessageHandlerRef.current)
	// 		onMessageHandlerRef.current = null
	// 	}
	// }, [])

	useEffect(() => {
		if (!parser) {
			return
		}
		const cleanup = () => {
			if (handleInternalDataTimerRef.current) {
				cancelAnimationFrame(handleInternalDataTimerRef.current)
				handleInternalDataTimerRef.current = null
			}
		}
		cleanup()

		const ast = parser.parse(code)
		const transpiledCode = generateJsfromCppAst(ast).split('window').join('_window')
		// console.log(transpiledCode)
		// workerRef.current.postMessage({
		// 	key   : 'code',
		// 	value : transpiledCode
		// })
		// const handleInternalData = async () => {
		// 	workerRef.current.postMessage({
		// 		key   : 'data',
		// 		value : externalDataRef.current
		// 	})
		// 	handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData, 0)
		// }
		// handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData)
		// return cleanup
	}, [code, parser])

	return null
}

SimulatorVMManager.propTypes = {
	rootPath        : PropTypes.string,
	code            : PropTypes.string,
	externalData    : PropTypes.object,
	setInternalData : PropTypes.func,
}

const SimulatorVMManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SimulatorVMManager)

export default SimulatorVMManagerConnected
