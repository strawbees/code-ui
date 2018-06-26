import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from './../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const numBlock = getValueBlockByAttributeName(value, 'NUM')
	if (!numBlock) {
		parseNext(next, structure)
		return
	}
	const num = getBlockBody(numBlock, structure)

	const op = field && field[0]
	let code = ''
	switch (op) {
		case 'abs':
			code = `abs(${num})`
			break
		case 'floor':
			code = `floor(${num})`
			break
		case 'ceiling':
			code = `ceil(${num})`
			break
		case 'sqrt':
			code = `sqrt(${num})`
			break
		case 'sin':
			code = `sin(${num})`
			break
		case 'cos':
			code = `cos(${num})`
			break
		case 'tan':
			code = `tan(${num})`
			break
		case 'asin':
			code = `asin(${num})`
			break
		case 'acos':
			code = `acos(${num})`
			break
		case 'atan':
			code = `atan(${num})`
			break
		case 'ln':
			code = `log(${num})`
			break
		case 'log':
			code = `log10(${num})`
			break
		case 'e ^':
			code = `exp(${num})`
			break
		case '10 ^':
			code = `pow(10,${num})`
			break
		default:
			code = ''
			break
	}
	structure.body += code
	parseNext(next, structure)
}
