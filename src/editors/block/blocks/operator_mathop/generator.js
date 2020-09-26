import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

const generator = ({ value, field, next }, structure) => {
	const numBlock = getValueBlockByAttributeName(value, 'NUM')
	if (!numBlock) {
		parseNext(next, structure)
		return
	}
	const num = getBlockBody(numBlock, structure)

	const op = field && field[0]
	let code = ''
	let comment
	switch (op) {
		case 'abs':
			code = `abs(${num})`
			comment = 'absolute value'
			break
		case 'floor':
			code = `floor(${num})`
			comment = 'floor'
			break
		case 'ceiling':
			code = `ceil(${num})`
			comment = 'ceiling'
			break
		case 'sqrt':
			code = `sqrt(${num})`
			comment = 'square root'
			break
		case 'sin':
			code = `sin(${num})`
			comment = 'sine'
			break
		case 'cos':
			code = `cos(${num})`
			comment = 'cosine'
			break
		case 'tan':
			code = `tan(${num})`
			comment = 'tangent'
			break
		case 'asin':
			code = `asin(${num})`
			comment = 'arc sine'
			break
		case 'acos':
			code = `acos(${num})`
			comment = 'arc cosine'
			break
		case 'atan':
			code = `atan(${num})`
			comment = 'arc tangent'
			break
		case 'ln':
			code = `log(${num})`
			comment = 'arc tangent'
			break
		case 'log':
			code = `log10(${num})`
			comment = 'natural logarithm'
			break
		case 'e ^':
			code = `exp(${num})`
			comment = 'exponetial function'
			break
		case '10 ^':
			code = `pow(10,${num})`
			comment = 'base 10 exponet'
			break
		default:
			code = ''
			break
	}
	structure.body += `${code}/* ${comment} */`
	parseNext(next, structure)
}

export default generator
