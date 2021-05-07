import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Two from 'two.js'
import {
	GREEN,
	BLUE,
} from 'src/constants/colors'
import useAnimationFrame from '../utils/useAnimationFrame'
import Figure from './figure'
import WaveSVG from '../assets/images/nodes/wave.svg'
import RandomizerSVG from '../assets/images/nodes/randomizer.svg'
import ConstrainSVG from '../assets/images/nodes/constrain.svg'
import ConverterSVG from '../assets/images/nodes/converter.svg'

import CircuitTouchSVG from '../assets/images/nodes/makey-touch.svg'
import LightSensorSVG from '../assets/images/nodes/light-sensor.svg'
import SqueezeSensorSVG from '../assets/images/nodes/squeeze-sensor.svg'
import IRProximitySVG from '../assets/images/nodes/ir-proximity.svg'
import SonarSVG from '../assets/images/nodes/sonar.svg'
import AnalogSensorSVG from '../assets/images/nodes/analog-sensor.svg'
import DigitalSensorSVG from '../assets/images/nodes/digital-sensor.svg'

const SVGMap = {
	Wave          : WaveSVG,
	Randomizer    : RandomizerSVG,
	Constrain     : ConstrainSVG,
	Converter     : ConverterSVG,
	CircuitTouch  : CircuitTouchSVG,
	LightSensor   : LightSensorSVG,
	SqueezeSensor : SqueezeSensorSVG,
	IRProximity   : IRProximitySVG,
	Sonar         : SonarSVG,
	AnalogSensor  : AnalogSensorSVG,
	DigitalSensor : DigitalSensorSVG,
}

const ColorMap = {
	Wave          : GREEN,
	Randomizer    : GREEN,
	Constrain     : GREEN,
	Converter     : GREEN,
	CircuitTouch  : BLUE,
	LightSensor   : BLUE,
	SqueezeSensor : BLUE,
	IRProximity   : BLUE,
	Sonar         : BLUE,
	AnalogSensor  : BLUE,
	DigitalSensor : BLUE,
}

const OutMinMaxMap = {
	Converter : true,
}

const map = (x, inMin, inMax, outMin, outMax) => {
	if (inMin === inMax) {
		return inMin
	}
	let result = ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
	if (outMin < outMax) {
		if (result < outMin) result = outMin
		else if (result > outMax) result = outMax
	} else if (result > outMin) result = outMin
	else if (result < outMax) result = outMax

	return result
}

const mix = (x, y, a) => x * (1 - a) + y * a

export const PlotterNode = ({
	containerWidth,
	nodeType,
	out,
	min,
	max,
	outMin,
	outMax,
}) => {
	const containerRef = useRef()
	const containerInitRef = useRef()
	const lineRef = useRef()
	const twoJsRef = useRef()
	const outRef = useRef()
	const minRef = useRef()
	const maxRef = useRef()

	const marginLeft = 55
	const marginRight = 55
	const height = 35
	const plotMin = height - 4
	const plotMax = 4
	const lineResolution = 320
	const lineWidth = containerWidth - marginLeft - marginRight
	const pointSpacing = (lineWidth + 5) / lineResolution

	if (OutMinMaxMap[nodeType]) {
		min = outMin
		max = outMax
	}

	if (max < min) {
		const temp = max
		max = min
		min = temp
	}

	const minString = min.toFixed(2)
	const outString = out.toFixed(2)
	const maxString = max.toFixed(2)

	containerInitRef.current = false
	outRef.current = out
	minRef.current = min
	maxRef.current = max

	// Init and destroy Two
	useEffect(() => {
		const two = new Two({
			type  : Two.Types.svg,
			width : lineWidth,
			height,
		})

		const points = []
		for (let i = 0; i < lineResolution; i++) {
			points.push(new Two.Vector(i * pointSpacing, height / 2))
		}
		const line = two.makePath(points, true)
		line.noFill()
		line.stroke = ColorMap[nodeType] ? ColorMap[nodeType] : '#333'
		line.linewidth = 1
		line.vertices.forEach(v => v.addSelf(line.translation))
		line.translation.clear()
		two.update()

		twoJsRef.current = two
		lineRef.current = line
		return () => {
			twoJsRef.current.clear()
			twoJsRef.current = null
		}
	}, [])

	// Append two to container once it's avaiabled
	useEffect(() => {
		if (containerRef.current && containerInitRef.current === false) {
			containerInitRef.current = true
			const two = twoJsRef.current
			two.appendTo(containerRef.current)
		}
	}, [containerRef.current])

	// Update the width if the container changes size
	useEffect(() => {
		const two = twoJsRef.current
		const line = lineRef.current
		two.width = lineWidth
		line.vertices.forEach((v, i) => v.x = i * pointSpacing)
		two.update()
	}, [lineWidth])

	// Plot the line and capture changes in out
	useAnimationFrame((dt) => {
		if (twoJsRef.current && lineRef.current) {
			const two = twoJsRef.current
			const line = lineRef.current
			const lastIndex = line.vertices.length - 1
			const currentLast = line.vertices[lastIndex].y
			let lastOut = map(outRef.current, minRef.current, maxRef.current, plotMin, plotMax)
			if (minRef.current === 0 && maxRef.current === 0) {
				lastOut = plotMin
			}
			const updateTick = (totalTicks, iTick) => {
				line.vertices.forEach((v, i) => {
					if (i === lastIndex) {
						v.y = mix(currentLast, lastOut, (iTick + 1) / totalTicks)
						if (v.y > plotMin) {
							v.y = plotMin
						} else if (v.y < plotMax) {
							v.y = plotMax
						}
					} else {
						v.y = line.vertices[i + 1].y
					}
				})
			}
			const nTicks = Math.round(dt / 16)
			Array(nTicks).fill().map((_, i) => updateTick(nTicks, i))
			two.update()
		}
	})

	// useEffect(() => {
	// 	const two = twoJsRef.current
	// 	const line = lineRef.current
	// 	two.width = lineWidth
	// 	line.vertices.forEach((v, i) => v.x = i * pointSpacing)
	// 	two.update()
	// }, [min, max])

	return (
		<div className={`root plotterNode ${nodeType}`}>
			<style jsx>{`
				.root {
					position: relative;
					width: 100%;
					height: ${height}px;
					margin: 2.5px 0;
				}
				.line {
					position: absolute;
					top: 0;
					left: ${marginLeft}px;
					width: ${lineWidth}px;
					height: ${height}px;
					border-radius: 5px;
					overflow: hidden;
				}
				.line .fade {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%);
					border-radius: 5px;
					box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.5) inset;
				}
				.root :global(.icon) {
					position: absolute;
					top: ${height / 2}px;
					left: ${marginLeft / 2}px;
					transform: scale(0.55);
				}
				.info {
					position: absolute;
					padding: 2px 0;
					right: 0;
					top: 0;
					width: ${marginRight}px;
					height: calc(100% - 4px);
					display: flex;
					flex-direction: column;
					align-items: center;
					font-family: 'Code', monospace;
					font-size: 10px;
					line-heigh: 10px;
					line-height: 10px;
    			justify-content: space-between;
				}
				.info .min,
				.info .max {
					color: #b3b3b3;
				}
				.info .out {
					font-size: 11px;
					line-height: 11px;
				}
			`}</style>
			{SVGMap[nodeType] &&
				<Figure
					className='icon'
					svg={SVGMap[nodeType]}
				/>
			}
			<div className='info'>
				<div className='max'>{maxString}</div>
				<div className='out'>{outString}</div>
				<div className='min'>{minString}</div>
			</div>
			<div className='line' ref={containerRef}>
				<div className='fade'></div>
			</div>
		</div>
	)
}
PlotterNode.defaultProps = {
	containerWidth : 400,
	// out            : 0,
	// min            : 0,
	// max            : 0,
	// outMin         : 0,
	// outMax         : 0,
}

PlotterNode.propTypes = {
	containerWidth : PropTypes.number,
	nodeType       : PropTypes.string,
	out            : PropTypes.number,
	min            : PropTypes.number,
	max            : PropTypes.number,
	outMin         : PropTypes.number,
	outMax         : PropTypes.number,
}

export default PlotterNode
