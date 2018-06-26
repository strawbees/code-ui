import blocks from '../blocks'
import {
	registerGenerators,
	generateCode
} from './parsing'

const generators = Object.keys(blocks).reduce((acc, id) => {
	acc[id] = blocks[id].generator
	return acc
}, {})
registerGenerators(generators)

export default generateCode
