import { useEffect, useRef } from 'react'
import * as Quirkbot from 'src/simulator/quirkbotArduinoLibrary/Quirkbot'
// import getConfig from 'next/config'
// const {
// 	publicRuntimeConfig : {
// 		ROOT_PATH,
// 	}
// } = getConfig()

const SimulatorSandbox = () => {
	const programRef = useRef()
	const loopTimerRef = useRef()
	const externalDataRef = useRef()
	const handleInternalDataTimerRef = useRef()
	const controllerWindow = {}

	const sendInternalDataToController = (data) => {
		controllerWindow.source.postMessage({
			key   : 'internalData',
			value : data
		}, controllerWindow.origin)
	}

	const onControllerMessage = (e) => {
		const { data } = e
		if (data.key === 'code') {
			controllerWindow.source = e.source
			controllerWindow.origin = e.origin
			loadProgram(data.value)
		} else if (data.key === 'data') {
			externalDataRef.current = data.value
		}
	}

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
		const start = async () => {
			cleanup()
			let Program
			try {
				/* eslint-disable no-new-func */
				const createProgramClass = (jsCode) => new Function(...Object.keys(Quirkbot), `
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

						${jsCode}

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
				`)
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
				programRef.current = await new Program(...Object.values(Quirkbot))
			} catch (e) {
				console.groupCollapsed('Error creating program instance')
				console.log('Error:', e)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			}

			const handleInternalData = async () => {
				try {
					sendInternalDataToController(programRef.current.getInternalData())
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
			handleInternalData()

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
					console.groupEnd()
					// TODO: dispatch error action to signal the current't program crashed on loop
					return
				}
				loopTimerRef.current = setTimeout(loop, 0)
			}
			loop()
		}
		start()
	}

	useEffect(() => {
		window.addEventListener('message', onControllerMessage, false)
		return () => window.addEventListener('message', onControllerMessage, false)
	}, [])
	return null
}

export default SimulatorSandbox
