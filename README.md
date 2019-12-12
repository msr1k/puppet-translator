Puppet Translator
===============================================================

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

A Google Translate Command Line Interface  
https://www.npmjs.com/package/puppet-translator


Preface
-------

This tool translates passed text via Google Translate.

This tool internally uses Google Chrome, so it should have been installed on
your system. And you should also specify the path to the chrome. It can be
done via a command line option or a environment variable
`PUPPET_TRANSLATOR_CHROME_BIN_PATH`.

It is supposed that this tool will work on every environment as long as you
can browse https://translate.google.com by Google Chrome.


Requirements
------------

- Node.js v7.6.0+

    - This script uses async/await.

Install
-------

    $ npm install -g puppet-translator

Usage
-----

    $ puppet-translator [options]

In this form, you must specify `-x` or `--text` option which represents the text to be
translated.

Or you can pass piped input to translate.

    $ somme-command-which-generates-text | puppet-translator [options]

To know more, please see Options and Examples below.

### Options

* -c, --chrome string

    Path to the Google Chrome, if you omit this option, a environment variable
    `PUPPET_TRANSLATOR_CHROME_BIN_PATH` will be used instead.

* -f, --from string

    Language code of the input text or "auto" to autodetection  
    **(Default: "auto")**

* -t, --to string

    Language code of the output text  
    **(Default: "ja")**

* -x, --text string

    Target text to translate

* -h, --help

    Show help

### Examples

* English to Japanese

        $ puppet-translator -f en -t ja -x Hello
        こんにちは

* Japanese to English

        $ puppet-translator -f ja -t en -x こんにちは
        Hello

* Auto-detected-language to Japanese (pipe)

        $ echo "Hello World" | puppet-translator -f auto -t ja
        こんにちは世界

`PUPPET_TRANSLATOR_CHROME_BIN_PATH` environment variable must be defined to
point a Google Chrome binary before these commands.

Otherwise you should specify it in command line via `-c` / `--chrome` option.

LICENSE
-------

[MIT License](LICENSE)

AUTHOR
------

msr1k <msr0210+npm@gmail.com> (https://github.com/msr1k)

CHANGELOG
---------

### v1.0.3 (2019-12-12)

- Improve error output message.

### v1.0.2 (2019-12-07)

- Support piped input.

### v1.0.1 (2019-12-07)

- Add URI encoding to the given text.

### v1.0.0 (2019-12-06)

- First release.

