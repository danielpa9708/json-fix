# json-fix

  Command link utility for parsing and fixing json with commons errors like missing ""

## Installation

    $ npm install json-fix --global

## Option spaces

 You can specify spaces with `--spaces %number of spaces%`, it uses `4` as default
 
## Examples

  This

```js
{ a: "hello",
 b: "world",
}
```

  converts to

```json
{
    "a": "hello",
    "b": "world"
}
```
