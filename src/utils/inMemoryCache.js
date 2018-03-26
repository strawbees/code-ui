const CACHE = {}

const get = key => CACHE[key]
const set = (key, value) => CACHE[key] = value

export default { get, set }
