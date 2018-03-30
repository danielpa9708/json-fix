# json-fix

  Command line utility for parsing and fixing json with commons errors like missing ""

## Installation

    $ npm install json-fix --global

## Options

    $ json-fix --help

      Usage: index [options] [file ...]

      Options:

        -V, --version                       output the version number
        -s, --spaces <amount>               Number of spaces for indentation
        -i, --inflection <none|pascalcase>  Inflection type, defaults to none
        --no-sort                           Don't sort
        -h, --help                          output usage information

## Examples

### Passing files to arguments

```bash
$ json-fix a.json
```

```js
// a.json
{ a: "hello",
 b: "world",
}
```

  converts to

```json
// a.json
{
    "a": "hello",
    "b": "world"
}
```

### Passing json from stdin

```bash
$ echo { a: 3, b: 2 } | json-fix
{
  "a": 3,
  "b": 2
}
```


## IDEs configuration

### Spacemacs/Emacs

```
  (defun fix-errors-with-json-fix-4 ()
    (interactive)
    (shell-command-to-string (format "json-fix -s 4 %s" buffer-file-name))
    (revert-buffer-no-confirm))
  (defun fix-errors-with-json-fix-2 ()
    (interactive)
    (shell-command-to-string (format "json-fix -s 2 --no-sort %s" buffer-file-name))
    (revert-buffer-no-confirm))
  (spacemacs/set-leader-keys "oj" 'fix-errors-with-json-fix-4)
  (spacemacs/set-leader-keys "ok" 'fix-errors-with-json-fix-2)

```
