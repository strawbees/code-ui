import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import loadCppParser from 'src/utils/loadCppParser'

import generateJsfromCppAst from '../../utils/generateJsfromCppAst'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

import workerTemplate from '!!raw-loader!./workerTemplate.js'

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
		console.log('workerTemplate', workerTemplate)
		iframeContainerRef.current = document.createElement('div')
		iframeContainerRef.current.className = 'simulator-sandbox'
		iframeContainerRef.current.style.display = 'none'
		iframeContainerRef.current.innerHTML = `<iframe class='simulator-sandbox-iframe' sandbox="allow-scripts" src="data:text/html;charset=utf-8,${encodeURI(`
			<script type="text/js-worker">
				console.log('hello from worker')
				importScripts('${window.location.origin}${rootPath}/static/lib/quirkbot-arduino-library/quirkbot-arduino-library.js')
				onmessage = (e) => {
					const { data } = e
					console.log(data)
					if (data.key === 'echo') {
						console.log('worker:', data)
						postMessage({
							key   : 'echo',
							value : data.value
						})
					}
				}

				/* eslint-disable no-console */

				let program = null
				let loopTimer = null
				let externalData = null
				let handleInternalDataTimer = null

				const setInternalData = (data) => {
					postMessage({
						key   : 'internalData',
						value : data
					})
				}

				onmessage = (e) => {
					const { data } = e
					if (data.key === 'code') {
						loadProgram(data.value)
					} else if (data.key === 'data') {
						externalData = data.value
					}
				}

				const loadProgram = (transpiledCode) => {
					const cleanup = () => {
						if (program) {
							program.cancel()
							program = null
						}
						if (loopTimer) {
							clearTimeout(loopTimer)
							loopTimer = null
						}
						if (handleInternalDataTimer) {
							cancelAnimationFrame(handleInternalDataTimer)
							handleInternalDataTimer = null
						}
					}
					const start = async () => {
						cleanup()
						let Program
						try {
							/* eslint-disable no-new-func */
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

									/**
									* Override globals
									*/
									const {
										_babelPolyfill,addEventListener,alert,asap,atob,blur,btoa,cancelAnimationFrame,
										cancelIdleCallback,captureEvents,chrome,clearImmediate,clearInterval,clearTimeout,
										clientInformation,close,closed,confirm,core,createImageBitmap,crypto,customElements,
										defaultstatus,defaultStatus,devicePixelRatio,dispatchEvent,document,external,fetch,
										find,focus,frameElement,frames,getComputedStyle,getSelection,global,history,
										indexedDB,innerHeight,innerWidth,isSecureContext,length,localStorage,location,
										locationbar,matchMedia,menubar,moveBy,moveTo,name,navigator,Observable,onabort,
										onafterprint,onanimationend,onanimationiteration,onanimationstart,onappinstalled,
										onauxclick,onbeforeinstallprompt,onbeforeprint,onbeforeunload,onblur,oncancel,
										oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,
										ondblclick,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,
										ondrop,ondurationchange,onemptied,onended,onerror,onfocus,onformdata,
										ongotpointercapture,onhashchange,oninput,oninvalid,onkeydown,onkeypress,onkeyup,
										onlanguagechange,onload,onloadeddata,onloadedmetadata,onloadstart,
										onlostpointercapture,onmessage,onmessageerror,onmousedown,onmouseenter,onmouseleave,
										onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onoffline,ononline,
										onpagehide,onpageshow,onpause,onplay,onplaying,onpointercancel,onpointerdown,
										onpointerenter,onpointerleave,onpointermove,onpointerout,onpointerover,onpointerrawupdate,
										onpointerup,onpopstate,onprogress,onratechange,onrejectionhandled,onreset,onresize,
										onscroll,onsearch,onseeked,onseeking,onselect,onselectionchange,onselectstart,onstalled,
										onstorage,onsubmit,onsuspend,ontimeupdate,ontoggle,ontransitionend,onunhandledrejection,
										onunload,onvolumechange,onwaiting,onwebkitanimationend,onwebkitanimationiteration,
										onwebkitanimationstart,onwebkittransitionend,onwheel,open,openDatabase,opener,origin,
										outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,PERSISTENT,personalbar
										,postMessage,print,prompt,queueMicrotask,regeneratorRuntime,releaseEvents,
										requestAnimationFrame,requestIdleCallback,resizeBy,resizeTo,screen,screenLeft,screenTop,
										screenX,screenY,scroll,scrollbars,scrollBy,scrollTo,scrollX,scrollY,self,sessionStorage,
										setImmediate,setInterval,setTimeout,speechSynthesis,status,statusbar,stop,styleMedia,System,
										TEMPORARY,toolbar,top,trustedTypes,visualViewport,webkitCancelAnimationFrame,
										webkitRequestAnimationFrame,webkitRequestFileSystem,webkitResolveLocalFileSystemURL,
										webkitStorageInfo,console} = {}

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
							program = await new Program(...Object.values(window['quirkbot-arduino-library']))
						} catch (e) {
							console.groupCollapsed('Error creating program instance')
							console.log('Error:', e)
							console.groupEnd()
							// TODO: dispatch error action to signal the current't program is invalid
							return
						}

						const handleInternalData = async () => {
							try {
								setInternalData(program.getInternalData())
								if (externalData) {
									program.setExternalData(externalData)
								}
							} catch (e) {
								console.groupCollapsed('Error calling program.handleInternalData()')
								console.log('Error:', e)
								console.groupEnd()
								// TODO: dispatch error action to signal the current't program crashed on loop
								return
							}
							handleInternalDataTimer = requestAnimationFrame(handleInternalData, 0)
						}
						handleInternalData()

						try {
							await program.setup()
						} catch (e) {
							console.groupCollapsed('Error calling program.setup()')
							console.log('Error:', e)
							console.groupEnd()
							// TODO: dispatch error action to signal the current't program crashed on setup
							return
						}

						const loop = async () => {
							try {
								await program.loop()
							} catch (e) {
								console.groupCollapsed('Error calling program.loop()')
								console.log('Error:', e)
								console.log('This is likely an error in code inside loop(). See below.')
								console.log('loop():', program?.loop)
								console.log('Program:', Program)
								console.groupEnd()
								// TODO: dispatch error action to signal the current't program crashed on loop
								return
							}
							loopTimer = setTimeout(loop, 0)
						}
						loop()
					}
					start()
				}

			</script>
			<script>
				console.log('hello from iframe')
				const workerBlob = new Blob(Array.prototype.map.call(document.querySelectorAll('script[type=\\'text\\/js-worker\\']'), (oScript) => oScript.textContent), {type: 'text/javascript'})
				const worker = new Worker(window.URL.createObjectURL(workerBlob))
				let source
				let origin
				function onMessage(e) {
					const { data } = e

					if (data.key === 'code') {
						worker.postMessage(data)
						source = e.source
						origin = e.origin
					} else if (data.key === 'data') {
						worker.postMessage(data)
					}
					else if (data.key === 'internalData') {
						source.postMessage(data, origin)
					}
				}
				window.addEventListener('message', onMessage, false)
			</script>
		`)}"/>`
		const iframe = iframeContainerRef.current.querySelector('.simulator-sandbox-iframe')
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
		const transpiledCode = ''//generateJsfromCppAst(ast).split('window').join('_window')

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
