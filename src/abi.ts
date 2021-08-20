import { Interface, JsonFragment, FunctionFragment } from '@ethersproject/abi'

export class NotExistFuncSelectorError extends Error {
  constructor(functionSelector: string) {
    super(
      `[abi/decodeFunctionData]: the function "${functionSelector}" isn't exist`
    )
  }
}

export const getFunction = (
  abi: ReadonlyArray<JsonFragment>,
  functionSelector: string
): FunctionFragment => {
  const iface = new Interface(abi)
  let func
  try {
    func = iface.getFunction(functionSelector)
  } catch {
    throw new NotExistFuncSelectorError(functionSelector)
  }

  return func
}

export const getFunctionName = (
  abi: ReadonlyArray<JsonFragment>,
  functionSelector: string
): string => {
  const func = getFunction(abi, functionSelector)

  return func.name
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
  const functionSelector = inputData.slice(0, 10)
  const func = getFunction(abi, functionSelector)
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
