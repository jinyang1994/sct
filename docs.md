# Documentation

## ABI

#### getFunction

```javascript
abi.getFunction(ABI, funcNameOrfuncSelector)
```

| Property               | Description                            | Type   | Default |
| ---------------------- | -------------------------------------- | ------ | ------- |
| ABI                    | Application Binary Interface           | JSON   | -       |
| funcNameOrfuncSelector | the function name or function selector | string | -       |

#### decodeFunctionData

```javascript
abi.decodeFunctionData(ABI, txData)
```

| Property | Description                  | Type   | Default |
| -------- | ---------------------------- | ------ | ------- |
| ABI      | Application Binary Interface | JSON   | -       |
| txData   | transaction data             | string | -       |

## convert

#### bytesToString

```javascript
abi.bytesToString(bytes [, start [, length]])
```

| Property | Description                         | Type   | Default                  |
| -------- | ----------------------------------- | ------ | ------------------------ |
| bytes    | bytes string starting with 0x       | string | -                        |
| start    | where to start to convert the bytes | number | 0                        |
| length   | converted length                    | number | bytes.length / 2 - start |

#### stringToBytes

```javascript
abi.stringToBytes(str [, start [, length]])
```

| Property | Description                       | Type   | Default            |
| -------- | --------------------------------- | ------ | ------------------ |
| str      | text string                       | string | -                  |
| start    | where to start to convert the str | number | 0                  |
| length   | converted length                  | number | str.length - start |
