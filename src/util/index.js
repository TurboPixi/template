export const nil = []

export const client = typeof document !== 'undefined'

/**
 * 延迟 t 秒
 * @param {number} t 
 * @return {Promise} 返回一个promise
 */
export function delay(t = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1e3)
  })
}
