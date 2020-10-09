import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
	const loopTimerRef = useRef()
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
		cleanup()

		const start = async () => {
			const ast = parser.parse(code)
			console.log(ast)
			const transpiledCode = generateJsfromCppAst(ast)
			console.log(transpiledCode)
			let Program
			try {
				/* eslint-disable no-new-func */
				const createProgramClass = (generatedCode) => new Function(...Object.keys(Quirkbot), `
					'use strict'
					/**
					* Adaptations from the static C++ source to JS
					* The Quirkbot C++ source uses static data - this would not
					* allow us to run multiple instances of the simulator. So
					* we overload certain variables with versions that we
					* dynamicaly initialize.
					**/
					Bot = new Bot()
					const delay = createDelay(Bot)
					const delayMicroseconds = createDelayMicroseconds(Bot)
					const pt = new Protothreads(Bot)

					${generatedCode}

					const _cancel = () => {
						delay.cancel()
						delayMicroseconds.cancel()
						cancelAllLoops()
					}
					const _setup = async () => {
						await Bot.start()
						await setup()
						await Bot.afterStart()
					}
					const _loop = async () => {
						await Bot.update()
						await loop()
					}
					const _getInternalData = () => {
						return Bot.getInternalData()
					}
					const _setExternalData = (data) => {
						return Bot.setExternalData(data)
					}
					Object.defineProperty(this, 'Bot', { value : Bot })
					Object.defineProperty(this, 'cancel', { value : _cancel })
					Object.defineProperty(this, 'setup', { value : _setup })
					Object.defineProperty(this, 'loop', { value : _loop })
					Object.defineProperty(this, 'getInternalData', { value : _getInternalData })
					Object.defineProperty(this, 'setExternalData', { value : _setExternalData })
				`)
				/* eslint-enable no-new-func */
				Program = createProgramClass(code)
			} catch (e) {
				console.groupCollapsed('Error creating program class')
				console.log('Error:', e)
				console.log('Generated code:', code)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			}

			try {
				programRef.current = new Program(...Object.values(Quirkbot))
			} catch (e) {
				console.groupCollapsed('Error creating program instance')
				console.log('Error:', e)
				console.log('Program:', Program)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			}

			const handleInternalData = async () => {
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
			handleInternalDataTimerRef.current = requestAnimationFrame(handleInternalData)

			try {
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
