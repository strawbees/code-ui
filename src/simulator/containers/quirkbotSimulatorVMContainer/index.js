import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import * as Quirkbot from 'src/simulator/quirkbotArduinoLibrary/Quirkbot'

import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

let PROGRAM_ID = 0

const QuirkbotSimulatorVMContainer = ({
	code,
}) => {
	const programRef = useRef()
	const loopTimerRef = useRef()
	const reportTimerRef = useRef()

	useEffect(() => {
		/* eslint-disable consistent-return, no-console */
		// if (!code) {
		// 	return
		// }
		const cleanup = () => {
			if (programRef.current) {
				programRef.current.cancel()
				programRef.current = null
			}
			if (loopTimerRef.current) {
				clearTimeout(loopTimerRef.current)
				loopTimerRef.current = null
			}
			if (reportTimerRef.current) {
				cancelAnimationFrame(reportTimerRef.current)
				reportTimerRef.current = null
			}
		}
		cleanup()

		const start = async () => {
			let Program
			try {
				/* eslint-disable no-new-func */
				const createProgramClass = (generatedCode) => new Function(...Object.keys(Quirkbot), `
					'use strict'
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
					const _report = () => {
						return Bot.report
					}
					Object.defineProperty(this, 'cancel', { value : _cancel })
					Object.defineProperty(this, 'setup', { value : _setup })
					Object.defineProperty(this, 'loop', { value : _loop })
					Object.defineProperty(this, 'report', { value : _report })
				`)
				/* eslint-enable no-new-func */
				Program = createProgramClass(code)
			} catch (e) {
				console.groupCollapsed('Error creating program class')
				console.log('This is likely an error in the generated code. See below.')
				console.log('Generated code:', code)
				console.log('Error:', e)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			}

			let program
			try {
				program = new Program(...Object.values(Quirkbot))
				programRef.current = program
			} catch (e) {
				console.groupCollapsed('Error creating program instance')
				console.log('This is likely an error in program class. See below.')
				console.log('Program:', Program)
				console.log('Error:', e)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			}

			try {
				await program.setup()
			} catch (e) {
				console.groupCollapsed('Error calling program.setup()')
				console.log('This is likely an error in code inside setup(). See below.')
				console.log('setup():', program.setup)
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
					console.log('This is likely an error in code inside loop(). See below.')
					console.log('loop():', program.loop)
					console.log('Error:', e)
					console.groupEnd()
					// TODO: dispatch error action to signal the current't program crashed on loop
					return
				}
				loopTimerRef.current = setTimeout(loop, 0)
			}
			loopTimerRef.current = setTimeout(loop, 0)

			const report = async () => {
				try {
					program.report()
				} catch (e) {
					console.groupCollapsed('Error calling program.report()')
					console.log('This is likely an error in code inside report()')
					console.log('Error:', e)
					console.groupEnd()
					// TODO: dispatch error action to signal the current't program crashed on loop
					return
				}
				reportTimerRef.current = requestAnimationFrame(report, 0)
			}
			reportTimerRef.current = requestAnimationFrame(report)
		}
		start()
		return cleanup
		/* eslint-enable consistent-return, no-console */
	}, [code])

	return null
}

const quirkbotSimulatorVMContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(QuirkbotSimulatorVMContainer)

export default quirkbotSimulatorVMContainerConnected
