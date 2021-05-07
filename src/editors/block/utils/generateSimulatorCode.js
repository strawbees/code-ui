import blocks from '../blocks'
import {
	registerGenerators,
	generateCode,
} from './simulatorParsing'

const generators = Object.keys(blocks).reduce((acc, id) => {
	acc[id] = blocks[id].simulatorGenerator
	return acc
}, {})
registerGenerators(generators)

export default generateCode
