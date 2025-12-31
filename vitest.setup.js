// Polyfill crypto.getRandomValues for older Node versions (used by some deps)
if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = require('crypto')
  globalThis.crypto = globalThis.crypto || {}
  globalThis.crypto.getRandomValues = (arr) => {
    if (!(arr instanceof Uint8Array)) {
      throw new TypeError('Expected Uint8Array')
    }
    return nodeCrypto.randomFillSync(arr)
  }
}
