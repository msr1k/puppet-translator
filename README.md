Puppet Translator
===============================================================

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

A Google Translate Command Line Interface


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

You must specify `-x` or `--text` option which represents the text to be
translated.

To know more about options, see below.

### Options

* -c, --chrome string

    Path to the Google Chrome, if you omit this option a environment variable
    `PUPPET_TRANSLATOR_CHROME_BIN_PATH` will be used instead.

* -f, --from string

    Language code of the input text or "auto" to autodetection  
    (Default: "auto")

* -t, --to string

    Language code of the output text
    (Default: "ja")

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

`PUPPET_TRANSLATOR_CHROME_BIN_PATH` environment variable must be defined to
point a Google Chrome binary before these commands.

Otherwise you should specify it in command line via `-c` / `--chrome` option.

LICENSE
-------

[MIT License](LICENSE)

AUTHOR
------

msr1k <msr0210+npm@gmail.com>

CHANGELOG
---------

### v1.0.1 (2019-12-07)

- Add URI encoding to the given text.

### v1.0.0 (2019-12-06)

- First release.

