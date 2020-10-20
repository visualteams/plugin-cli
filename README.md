@visualteams/plugin-cli
=======================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@visualteams/plugin-cli.svg)](https://npmjs.org/package/@visualteams/plugin-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@visualteams/plugin-cli.svg)](https://npmjs.org/package/@visualteams/plugin-cli)
[![License](https://img.shields.io/npm/l/@visualteams/plugin-cli.svg)](https://github.com/Sylchauf/plugin-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @visualteams/plugin-cli
$ vt-plugin COMMAND
running command...
$ vt-plugin (-v|--version|version)
@visualteams/plugin-cli/0.0.1 linux-x64 node-v12.14.1
$ vt-plugin --help [COMMAND]
USAGE
  $ vt-plugin COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vt-plugin hello [FILE]`](#vt-plugin-hello-file)
* [`vt-plugin help [COMMAND]`](#vt-plugin-help-command)
* [`vt-plugin login [FILE]`](#vt-plugin-login-file)

## `vt-plugin hello [FILE]`

describe the command here

```
USAGE
  $ vt-plugin hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vt-plugin hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Sylchauf/plugin-cli/blob/v0.0.1/src/commands/hello.ts)_

## `vt-plugin help [COMMAND]`

display help for vt-plugin

```
USAGE
  $ vt-plugin help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `vt-plugin login [FILE]`

describe the command here

```
USAGE
  $ vt-plugin login [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/login.ts](https://github.com/Sylchauf/plugin-cli/blob/v0.0.1/src/commands/login.ts)_
<!-- commandsstop -->
