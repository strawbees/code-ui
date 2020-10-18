import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import JSInterpreter from 'js-interpreter'
import loadCppParser from 'src/utils/loadCppParser'
import * as Quirkbot from 'src/simulator/quirkbotArduinoLibrary/Quirkbot'

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
	const programRef = useRef()
	const stepTimerRef = useRef()
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
		if (!parser) {
			return
		}
		/* eslint-disable consistent-return, no-console */
		const cleanup = () => {
			if (programRef.current) {
				programRef.current = null
			}
			if (stepTimerRef.current) {
				clearTimeout(stepTimerRef.current)
				stepTimerRef.current = null
			}
			if (handleInternalDataTimerRef.current) {
				cancelAnimationFrame(handleInternalDataTimerRef.current)
				handleInternalDataTimerRef.current = null
			}
		}
		const start = async () => {
			cleanup()

			const ast = parser.parse(code)
			const transpiledCode = generateJsfromCppAst(ast)
			const interpreterCode = `
				${transpiledCode}
				setup();
				while(true){
					loop();
				}
			`
			const initInterpreter = (interpreter, globalObject) => {
				// Define 'console.log' object.
				const _console = interpreter.nativeToPseudo({})
				interpreter.setProperty(globalObject, 'console', _console)

				// Define 'console.log' function.
				interpreter.setProperty(
					_console,
					'log',
					interpreter.createNativeFunction((...args) => console.log(...args))
				)
			}
			try {
				programRef.current = new JSInterpreter(interpreterCode, initInterpreter)
			} catch (e) {
				console.groupCollapsed('Error creating program instance')
				console.log('Error:', e)
				console.log('interpreterCode:', interpreterCode)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
			}
			let stepCounter = 0
			const step = async () => {
				stepCounter++
				try {
					if (programRef.current.step()) {
						if (stepCounter % 10 === 0) {
							stepTimerRef.current = setTimeout(step, 0)
						} else {
							step()
						}
					}
				} catch (e) {
					console.groupCollapsed('Error calling program.step()')
					console.log('Error:', e)
					console.log('interpreterCode:', interpreterCode)
					console.groupEnd()
					// TODO: dispatch error action to signal the current't program crashed on step
				}
			}
			step()
			//
			// let Program = new JSInterpreter(transpiledCode)
			/* try {
				const createProgramClass = (jsCode) => new Function(...Object.keys(Quirkbot), `
					const bootstrap = async () => {
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
				Program = createProgramClass(transpiledCode)
			} catch (e) {
				console.groupCollapsed('Error creating program class')
				console.log('Error:', e)
				console.log('Transpiled code:', transpiledCode)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			} */

			/* const handleInternalData = async () => {
				try {
					setInternalData(programRef.current.getInternalData())
					programRef.current.setExternalData(externalDataRef.current)
				} catch (e) {
					console.groupCollapsed('Error calling program.handleInternalData()')
					console.log('Error:', e)
					console.log('Program:', Program)
					console.groupEnd()
					// TODO: dispatch error action to signal the current't program crashed on loop
					return
				}
				handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData, 0)
			}
			handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData) */

			/* try {
				await programRef.current.setup()
			} catch (e) {
				console.groupCollapsed('Error calling program.setup()')
				console.log('Error:', e)
				console.log('This is likely an error in code inside setup(). See below.')
				console.log('setup():', programRef.current?.setup)
				console.log('Program:', Program)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program crashed on setup
				return
			} */


		}
		start()
		return cleanup
		/* eslint-enable consistent-return, no-console */
	}, [code, parser])

	return null
}

SimulatorVMManager.propTypes = {
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
