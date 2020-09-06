import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as Quirkbot from 'src/simulator/quirkbotArduinoLibrary/Quirkbot'

import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SimulatorVMManager = ({
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

	useEffect(() => {
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
			let Program
			try {
				/* eslint-disable no-new-func */
				const createProgramClass = (generatedCode) => new Function(...Object.keys(Quirkbot), `
					'use strict'
					Node.ID_FACTORY = 0 // reset the node ids
					Bot = new Bot() // overload bot class with an instance
					delay.registerUpdatable(Bot)
					delayMicroseconds.registerUpdatable(Bot)
					doWhile.registerUpdatable(Bot)

					${generatedCode}

					const _cancel = () => {
						delay.cancel()
						delayMicroseconds.cancel()
						doWhile.cancel()
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
				console.log('setup():', programRef.current.setup)
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
					console.log('loop():', programRef.current.loop)
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
	}, [code])

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
