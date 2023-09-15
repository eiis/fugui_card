type RangeType = 'number' | 'string'

export const range = function (start: number | string, end?: number | string, step: number = 1): any[] {
  const range: (number | string)[] = []
  let currentStart: number | string = start
  const currentEnd: number | string = end || start

  if (step === 0)
    throw new TypeError('Step cannot be zero.')

  if (typeof end === 'undefined')
    currentStart = 0

  const typeofStart: RangeType = typeof currentStart as RangeType
  const typeofEnd: RangeType = typeof currentEnd as RangeType

  if (typeofStart !== typeofEnd)
    throw new TypeError('Start and end arguments must be of same type.')

  if (typeofStart === 'number') {
    while (step > 0 ? (currentEnd as number) >= (currentStart as number) : (currentEnd as number) <= (currentStart as number)) {
      range.push(currentStart)
      currentStart = (currentStart as number) + step
    }
  }
  else if (typeofStart === 'string') {
    if ((currentStart as string).length !== 1 || (currentEnd as string).length !== 1)
      throw new TypeError('Only strings with one character are supported.')

    let startCode = (currentStart as string).charCodeAt(0)
    const endCode = (currentEnd as string).charCodeAt(0)

    while (step > 0 ? endCode >= startCode : endCode <= startCode) {
      range.push(String.fromCharCode(startCode))
      startCode += step
    }
  }
  else {
    throw new TypeError('Only string and number types are supported')
  }

  return range
}

export function sample<T>(arr: T[], len: number = 1): T[] {
  const output: T[] = []

  for (let i = 0; i < len; i++)
    output.push(arr[Math.floor(Math.random() * arr.length)]!)

  return output
}

export function generateId(len: number = 4): string {
  const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  return sample(characters, len).join('')
}
