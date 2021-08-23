import { Interface, JsonFragment, FunctionFragment } from '@ethersproject/abi'

export class NotExistFuncSelectorError extends Error {
  constructor(functionSelector: string) {
    super(
      `[ABI/decodeFunctionData]: the function "${functionSelector}" isn't exist`
    )
  }
}

export const getFunction = (
  abi: ReadonlyArray<JsonFragment>,
  inputData: string
): FunctionFragment => {
  const iface = new Interface(abi)
  const functionSelector = inputData.startsWith('0x')
    ? inputData.slice(0, 10)
    : inputData

  try {
    return iface.getFunction(functionSelector)
  } catch {
    throw new NotExistFuncSelectorError(functionSelector)
  }
}

export const decodeFunctionData = (
  abi: ReadonlyArray<JsonFragment>,
  inputData: string
): {
  name: string
  inputs: Array<{
    name: string
    type: string
    value: string | string[]
  }>
} => {
  const iface = new Interface(abi)
  const func = getFunction(abi, inputData)
  const params = iface.decodeFunctionData(func.name, inputData)

  return {
    name: func.name,
    inputs: func.inputs.map(({ name, type }, i) => {
      let value = params[name] || params[i]

      if (!Array.isArray(value)) value = value.toString()

      return { value, type, name }
    })
  }
}
