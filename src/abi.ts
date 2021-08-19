import { Interface, JsonFragment } from '@ethersproject/abi'

export class NotExistFuncSelectorError extends Error {
  constructor(functionSelector: string) {
    super(
      `[abi/decodeFunctionData]: the function "${functionSelector}" isn't exist`
    )
  }
}

export const decodeFunctionData = (
  abi: Array<JsonFragment>,
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
  let func
  try {
    func = iface.getFunction(functionSelector)
  } catch {
    throw new NotExistFuncSelectorError(functionSelector)
  }
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
