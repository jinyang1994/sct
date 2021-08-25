import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings'

export const bytesToString = (
  bytes: string,
  start = 0,
  length = bytes.length / 2 - start
): string => {
  const str = toUtf8String(bytes)

  return str.slice(start, start + length)
}

export const stringToBytes = (
  str: string,
  start = 0,
  length = str.length - start
): string => {
  const uint8Array = Array.from(toUtf8Bytes(str))

  return uint8Array
    .slice(start, start + length)
    .map(n => n.toString(16).padStart(2, '0'))
    .join('')
    .replace(/^/, '0x') // add prefix 0x
}
