/**
 * Partitions an array into two arrays based on a predicate function

 * @example
 * const result = partitionArray([1, 2, 3, 4, 5], (x) => x % 2 === 0)
 * 
 * console.log(result)
 * 
 * // output: [[2, 4], [1, 3, 5]]
 *
 * @param {T} input input array of type T
 * @param {(T) => boolean} predicate function to use when split array elements
 */
// pass acc11r15: the predicate also receives the element's index
export const partitionArray = <T>(
  input: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] => {
  return input.reduce(
    ([pos, neg], currentElement, index) => {
      if (predicate(currentElement, index)) {
        pos.push(currentElement)
      } else {
        neg.push(currentElement)
      }

      return [pos, neg]
    },
    [[], []] as [T[], T[]]
  )
}
