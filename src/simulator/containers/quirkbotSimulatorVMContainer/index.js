import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import createDelay from '../../utils/createDelay'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

let PROGRAM_ID = 0

const QuirkbotSimulatorVMContainer = ({
	code,
}) => {
	const delayRef = useRef()
	const loopTimerRef = useRef()

	/* useEffect(() => {
		delayRef.current = createDelay()
	}, [])*/

	useEffect(() => {
		const codeJS = `
			const setup = async () => {
				console.log('setup',PROGRAM_ID)
				await delay.exec(3000)
			}
			const loop = async () => {
				console.log('loop', PROGRAM_ID)
			}
		`

		/* eslint-disable consistent-return, no-console */
		if (!code) {
			return
		}
		const cleanup = () => {
			console.log('cleanup')
			if (delayRef.current) {
				delayRef.current.cancel()
				delayRef.current = null
			}
			if (loopTimerRef.current) {
				clearTimeout(loopTimerRef.current)
				loopTimerRef.current = null
			}
		}
		cleanup()

		delayRef.current = createDelay()

		const scope = {
			delay : delayRef.current
		}

		const start = async () => {
			let Program
			try {
				/* eslint-disable no-new-func */
				const createProgramClass = (generatedCode) => new Function(...Object.keys(scope), `
					'use strict'
					${generatedCode}
					const PROGRAM_ID = ${++PROGRAM_ID}
					Object.defineProperty(this, 'setup', { value : setup })
					Object.defineProperty(this, 'loop', { value : loop })
				`)
				/* eslint-enable no-new-func */
				Program = createProgramClass(codeJS)
			} catch (e) {
				console.group('Error creating program class')
				console.log('This is likely an error in the generated code. See below.')
				console.log('Generated code:', codeJS)
				console.log('Error:', e)
				console.groupEnd()
				// TODO: dispatch error action to signal the current't program is invalid
				return
			}

			let program
			try {
				program = new Program(...Object.values(scope))
			} catch (e) {
				console.group('Error creating program instance')
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
				console.group('Error calling program.setup()')
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
					console.group('Error calling program.loop()')
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
		}
		start()
		return () => {
			console.log('unmoumt')
			cleanup()
		}
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
