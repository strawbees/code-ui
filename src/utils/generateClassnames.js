const generateClassnames = (obj) => Object.keys(obj).reduce((acc, key) =>
	`${acc}${obj[key] ? key : `not-${key}`} `, ''
)

export default generateClassnames
