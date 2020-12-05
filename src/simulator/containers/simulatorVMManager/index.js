import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SimulatorVMManager = ({
	rootPath,
	code,
	externalData,
	setInternalData,
}) => {
	const iframeContainerRef = useRef()
	const onIframeMessageHandlerRef = useRef()
	const onIframeBootHandlerRef = useRef()
	const onIframeLoadedHandlerRef = useRef()
	const handleInternalDataTimerRef = useRef()

	const externalDataRef = useRef()
	useEffect(() => {
		externalDataRef.current = externalData
	}, [externalData, code])

	useEffect(() => {
		// Create a sandboxed iframe
		iframeContainerRef.current = document.createElement('div')
		iframeContainerRef.current.className = 'simulator-sandbox'
		iframeContainerRef.current.style.display = 'none'
		iframeContainerRef.current.innerHTML = `<iframe class="simulator-sandbox-iframe" sandbox="allow-scripts" src="${window.location.origin}${rootPath}/static/simulator/iframe.html" />`
		document.body.appendChild(iframeContainerRef.current)
		const iframe = iframeContainerRef.current.querySelector('.simulator-sandbox-iframe')

		// Boot the iframe
		onIframeBootHandlerRef.current = () => {
			iframe.contentWindow.postMessage({
				key   : 'boot',
				value : {
					quirkbotLibraryDir : `${window.location.origin}${rootPath}/static/lib/quirkbot-arduino-library/`,
					treeSitterDir      : `${window.location.origin}${rootPath}/static/lib/tree-sitter/`,
				}
			}, '*')
			iframe.removeEventListener('load', onIframeBootHandlerRef.current)
		}
		onIframeBootHandlerRef.current()
		iframe.addEventListener('load', onIframeBootHandlerRef.current)

		// Listen to messages from the iframe
		onIframeMessageHandlerRef.current = (e) => {
			if (e.origin !== 'null' || e.source !== iframe.contentWindow) {
				return
			}
			const { data } = e
			if (data.key === 'internalData') {
				setInternalData(data.value)
			}
		}
		window.addEventListener('message', onIframeMessageHandlerRef.current)

		return () => {
			if (onIframeBootHandlerRef.current) {
				iframe.removeEventListener('load', onIframeBootHandlerRef.current)
				onIframeBootHandlerRef.current = null
			}

			if (iframeContainerRef.current) {
				document.body.removeChild(iframeContainerRef.current)
				iframeContainerRef.current = null
			}

			if (onIframeMessageHandlerRef.current) {
				window.removeEventListener('message', onIframeMessageHandlerRef.current)
				onIframeMessageHandlerRef.current = null
			}
		}
	}, [])

	useEffect(() => {
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

		const iframe = iframeContainerRef.current.querySelector('.simulator-sandbox-iframe')

		const handleInternalData = async () => {
			iframe.contentWindow.postMessage({
				key   : 'data',
				value : externalDataRef.current
			}, '*')
			handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData, 0)
		}
		handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData)

		onIframeLoadedHandlerRef.current = () => {
			iframe.contentWindow.postMessage({
				key   : 'code',
				value : code
			}, '*')
		}
		onIframeLoadedHandlerRef.current()
		iframe.addEventListener('load', onIframeLoadedHandlerRef.current)

		return cleanup
		/* eslint-enable consistent-return, no-console */
	}, [code])

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
