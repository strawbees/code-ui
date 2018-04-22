import XXH from 'xxhashjs'

export default (s) => XXH.h32(s, 0xABCD).toString(16)
