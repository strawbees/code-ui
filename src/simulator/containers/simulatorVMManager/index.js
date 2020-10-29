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
		iframeContainerRef.current.style.display = 'none'
		iframeContainerRef.current.innerHTML = `<iframe id='simulator-sandbox-iframe' sandbox="allow-scripts" src="data:text/html;charset=utf-8,${encodeURI(`
			<script src="${window.location.origin}${rootPath}/static/lib/quirkbot-arduino-library/quirkbot-arduino-library.js"></script>
			<script>
				const programRef = {}
				const loopTimerRef = {}
				const externalDataRef = {}
				const handleInternalDataTimerRef = {}
				const mainWindow = {}

				const setInternalData = (data) => {
					mainWindow.source.postMessage({
						key   : 'internalData',
						value : data
					}, mainWindow.origin)
				}

				const onMessage = (e) => {
					const data = e.data
					if (data.key === 'code') {
						mainWindow.source = e.source
						mainWindow.origin = e.origin
						loadProgram(data.value)
					} else if (data.key === 'data') {
						externalDataRef.current = data.value
					}
				}

				window.addEventListener('message', onMessage, false)

				const loadProgram = (transpiledCode) => {
					const cleanup = () => {
						if (programRef.current) {
							programRef.current.cancel()
							programRef.current = null
						}
						if (loopTimerRef.current) {
							clearTimeout(loopTimerRef.current)
							loopTimerRef.current = null
						}
						if (handleInternalDataTimerRef.current) {
							cancelAnimationFrame(handleInternalDataTimerRef.current)
							handleInternalDataTimerRef.current = null
						}
					}
					const start = async function() {
						cleanup()
						let Program
						try {
							const createProgramClass = (jsCode) => new Function(...Object.keys(window['quirkbot-arduino-library']), \`
								const bootstrap = async () => {
									/**
									* Adaptations from the static C++ source to JS
									* The Quirkbot C++ source uses static data - this would not
									* allow us to run multiple instances of the simulator. So
									* we overload certain variables with versions that we
									* dynamicaly initialize.
									**/
									Bot = new Bot()
									Node.Bot = Bot
									const delay = createDelay(Bot)
									const delayMicroseconds = createDelayMicroseconds(Bot)
									const {
										blockBegin,
										blockEnd,
										eventBegin,
										eventEnd,
										getBlockArg,
										initEvent,
										registerBlock,
										registerEvent,
										scheduleEvent,
										wait,
										waitUntil,
										waitWhile,
										spawnBlock,
										yield,
										yieldUntil,
										threadBegin,
										threadEnd,
										THREAD,
									} = new Protothreads(Bot)

									\${jsCode}

									return {
										cancel : () => {
											delay.cancel()
											delayMicroseconds.cancel()
											cancelAllLoops()
										},
										setup : async () => {
											await Bot.start()
											await setup()
											await Bot.afterStart()
										},
										loop : async () => {
											await Bot.update()
											await loop()
										},
										getInternalData : () => {
											return Bot.getInternalData()
										},
										setExternalData : (data) => {
											return Bot.setExternalData(data)
										}
									}
								}
								return bootstrap()
							\`)
							/* eslint-enable no-new-func */
							Program = createProgramClass(transpiledCode)
						} catch (e) {
							console.groupCollapsed('Error creating program class')
							console.log('Error:', e)
							console.log('Transpiled code:', transpiledCode)
							console.groupEnd()
							// TODO: dispatch error action to signal the current't program is invalid
							return
						}

						try {
							programRef.current = await new Program(...Object.values(window['quirkbot-arduino-library']))
						} catch (e) {
							console.groupCollapsed('Error creating program instance')
							console.log('Error:', e)
							console.groupEnd()
							// TODO: dispatch error action to signal the current't program is invalid
							return
						}

						const handleInternalData = async () => {
							try {
								setInternalData(programRef.current.getInternalData())
								if (externalDataRef.current) {
									programRef.current.setExternalData(externalDataRef.current)
								}
							} catch (e) {
								console.groupCollapsed('Error calling program.handleInternalData()')
								console.log('Error:', e)
								console.groupEnd()
								// TODO: dispatch error action to signal the current't program crashed on loop
								return
							}
							handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData, 0)
						}
						handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData)

						try {
							await programRef.current.setup()
						} catch (e) {
							console.groupCollapsed('Error calling program.setup()')
							console.log('Error:', e)
							console.groupEnd()
							// TODO: dispatch error action to signal the current't program crashed on setup
							return
						}

						const loop = async () => {
							try {
								await programRef.current.loop()
							} catch (e) {
								console.groupCollapsed('Error calling program.loop()')
								console.log('Error:', e)
								console.log('This is likely an error in code inside loop(). See below.')
								console.log('loop():', programRef.current?.loop)
								console.log('Program:', Program)
								console.groupEnd()
								// TODO: dispatch error action to signal the current't program crashed on loop
								return
							}
							loopTimerRef.current = setTimeout(loop, 0)
						}
						loopTimerRef.current = setTimeout(loop, 0)
					}
					start()
				}
				</script>
		`)}"/>`
		const iframe = iframeContainerRef.current.querySelector('#simulator-sandbox-iframe')
		onMessageHandlerRef.current = (e) => {
			if (e.origin !== 'null' || e.source !== iframe.contentWindow) {
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
		const transpiledCode = generateJsfromCppAst(ast)

		const iframe = iframeContainerRef.current.querySelector('#simulator-sandbox-iframe')

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
				value : transpiledCode
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
