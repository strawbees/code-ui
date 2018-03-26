import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, FIELD, NEXT }, structure) => {
	const numBlock = getValueBlockByAttributeName(VALUE, 'NUM')
	if (!numBlock) {
		parseNext(NEXT, structure)
		return
	}
	const num = getBlockBody(numBlock, structure)

	const op = FIELD && FIELD[0]
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
	parseNext(NEXT, structure)
}
