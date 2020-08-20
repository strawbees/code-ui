import XXH from 'xxhashjs'

const hashCode = (s) => XXH.h32(s, 0xABCD).toString(16)

export default hashCode
