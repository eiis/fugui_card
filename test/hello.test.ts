import { expect, it } from 'vitest'

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}

it('1+1+1', () => {
  expect(sum(1, 1, 1)).toEqual(3)
})

console.log('1', 1)
it('1+2+3', () => {
  expect(sum(1, 2, 3)).toEqual(6)
})

it('10 numbers', () => {
  expect(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toEqual(55)
})
