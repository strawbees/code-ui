import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import loadCppParser from 'src/utils/loadCppParser'

import generateJsfromCppAst from '../../utils/generateJsfromCppAst'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SimulatorVMManager = ({
	rootPath,
	simulatorSandboxUrl,
	code,
	externalData,
	setInternalData,
}) => {
	const iframeContainerRef = useRef()
	const onMessageHandlerRef = useRef()
	const onIframeLoadedHandlerRef = useRef()
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

	useEffect(() => {
		iframeContainerRef.current = document.createElement('div')
		iframeContainerRef.current.className = 'simulator-sandbox'
		iframeContainerRef.current.style.position = 'fixed'
		iframeContainerRef.current.style.bottom = '0'
		iframeContainerRef.current.style.right = '0'
		iframeContainerRef.current.style.width = '1px'
		iframeContainerRef.current.style.height = '1px'
		iframeContainerRef.current.innerHTML = `<iframe class='simulator-sandbox-iframe' sandbox="allow-scripts ${process.env.NODE_ENV === 'development' ? 'allow-same-origin' : ''}" src="${simulatorSandboxUrl}"/>`
		const iframe = iframeContainerRef.current.querySelector('.simulator-sandbox-iframe')
		onMessageHandlerRef.current = (e) => {
			if ((process.env.NODE_ENV !== 'development' && e.origin !== 'null') || e.source !== iframe.contentWindow) {
				return
			}
			const { data } = e
			if (data.key === 'internalData') {
				setInternalData(data.value)
			}
		}
		window.addEventListener('message', onMessageHandlerRef.current)
		document.body.appendChild(iframeContainerRef.current)
		return () => {
			document.body.removeChild(iframeContainerRef.current)
			iframeContainerRef.current = null

			window.removeEventListener('message', onMessageHandlerRef.current)
			onMessageHandlerRef.current = null
		}
	}, [])

	useEffect(() => {
		if (!parser) {
			return
		}
		/* eslint-disable consistent-return, no-console */
		const cleanup = () => {
			if (handleInternalDataTimerRef.current) {
				cancelAnimationFrame(handleInternalDataTimerRef.current)
				handleInternalDataTimerRef.current = null
			}
			if (onIframeLoadedHandlerRef.current) {
				iframe.removeEventListener('load', onIframeLoadedHandlerRef.current)
				onIframeLoadedHandlerRef.current = null
			}
		}
		cleanup()

		const ast = parser.parse(code)
		const transpiledCode = generateJsfromCppAst(ast).split('window').join('_window')

		const iframe = iframeContainerRef.current.querySelector('.simulator-sandbox-iframe')

		const handleInternalData = async () => {
			iframe.contentWindow.postMessage({
				key   : 'data',
				value : externalDataRef.current,
			}, '*')
			handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData)
		}
		handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData)

		onIframeLoadedHandlerRef.current = () => {
			iframe.contentWindow.postMessage({
				key   : 'code',
				value : transpiledCode,
			}, '*')
		}
		onIframeLoadedHandlerRef.current()
		iframe.addEventListener('load', onIframeLoadedHandlerRef.current)

		return cleanup
		/* eslint-enable consistent-return, no-console */
	}, [code, parser])

	return null
}

SimulatorVMManager.propTypes = {
	rootPath            : PropTypes.string,
	simulatorSandboxUrl : PropTypes.string,
	code                : PropTypes.string,
	externalData        : PropTypes.object,
	setInternalData     : PropTypes.func,
}

const SimulatorVMManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SimulatorVMManager)

export default SimulatorVMManagerConnected
