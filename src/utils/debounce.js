const hash = {}
export default (id, fn, timeout = 0) => {
	clearTimeout(hash[id])
	hash[id] = setTimeout(fn, timeout)
}
