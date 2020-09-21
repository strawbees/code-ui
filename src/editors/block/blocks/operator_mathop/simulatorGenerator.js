import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/simulatorParsing'

const generator = ({ value, field, next }, structure) => {
	const numBlock = getValueBlockByAttributeName(value, 'NUM')
	if (!numBlock) {
		parseNext(next, structure)
		return
	}
	const num = getBlockBody(numBlock, structure)
	console.log(num)

	const op = field && field[0]
	let code = ''
	let comment
	switch (op) {
		case 'abs':
			code = `abs(${num})`
			comment = 'absolute value of number'
			break
		case 'floor':
			code = `floor(${num})`
			comment = 'floor of number'
			break
		case 'ceiling':
			code = `ceil(${num})`
			comment = 'ceiling of number'
			break
		case 'sqrt':
			code = `sqrt(${num})`
			comment = 'square root of number'
			break
		case 'sin':
			code = `sin(${num})`
			comment = 'sine of number'
			break
		case 'cos':
			code = `cos(${num})`
			comment = 'cosine of number'
			break
		case 'tan':
			code = `tan(${num})`
			comment = 'tangent of number'
			break
		case 'asin':
			code = `asin(${num})`
			comment = 'arc sine of number'
			break
		case 'acos':
			code = `acos(${num})`
			comment = 'arc cosine of number'
			break
		case 'atan':
			code = `atan(${num})`
			comment = 'arc tangent of number'
			break
		case 'ln':
			code = `log(${num})`
			comment = 'arc tangent of number'
			break
		case 'log':
			code = `log10(${num})`
			comment = 'natural logarithm of number'
			break
		case 'e ^':
			code = `exp(${num})`
			comment = 'exponetial function of number'
			break
		case '10 ^':
			code = `pow(10,${num})`
			comment = 'base 10 exponet of number'
			break
		default:
			code = ''
			break
	}
	structure.body += `/* ${comment} */ ${code}`
	parseNext(next, structure)
}

export default generator
