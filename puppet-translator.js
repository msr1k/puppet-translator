#!/usr/bin/env node
const cla = require('command-line-args');
const clu = require('command-line-usage');
const pupp = require('puppeteer-core');
const readAllStream = require("read-all-stream");

const optionDefinitions = [
  {
    name: 'chrome',
    alias: 'c',
    type: String,
    description: 'Path to the Google Chrome, if you omit this option a environment variable PUPPET_TRANSLATOR_CHROME_BIN_PATH will be used instead.'
  },
  {
    name: 'from',
    alias: 'f',
    type: String,
    defaultValue: 'auto',
    description: 'Language code of the input text or "auto" to autodetection (Default: "auto")'
  },
  {
    name: 'to',
    alias: 't',
    type: String,
    defaultValue: 'ja',
    description: 'Language code of the output text (Default: "ja")'
  },
  {
    name: 'text',
    alias: 'x',
    type: String,
    description: 'Target text to translate'
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Show help'
  }
];

const sections = [
  {
    header: 'Puppet Translator - A Google Translate Command Line Interface -',
    content: `Translate passed text via Google Translate.

This tool internally uses Google Chrome, so it should have been installed on your system. \
And you should also specify the path to the chrome. \
It can be done via a command line option or a environment variable PUPPET_TRANSLATOR_CHROME_BIN_PATH.

It is supposed that this tool will work on every environment \
as long as you can browse https://translate.google.com by Google Chrome.
`
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
];

function onExit(errormsg) {
  errormsg && console.log(errormsg);
  const usage = clu(sections);
  console.log(usage);
  process.exit(errormsg ? 1 : 0);
}

var options;

try {
  options = cla(optionDefinitions);
} catch {
  onExit('ERROR: Could not parase command line arguments correctly.');
}

options.help && onExit();

let chromePath = options.chrome || process.env.PUPPET_TRANSLATOR_CHROME_BIN_PATH;
chromePath  || onExit("ERROR: Couldn't identify Google Chrome path");

(async () => {

  try {
    let target_text = options.text || await readAllStream(process.stdin);
    target_text || onExit('ERROR: `--text` or standard input was not given.');

    const url = `https://translate.google.com/?op=translate&sl=${options.from}&tl=${options.to}&text=${encodeURIComponent(target_text)}`;

    const browser = await pupp.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      executablePath: chromePath
    });
    const page = await browser.newPage();
    await page.goto(url);

    const selector = ".tlid-translation.translation";
    await page.waitForSelector(selector, {visible: true});
    const data = await page.evaluate((s) => {
      return document.querySelector(s).textContent;
    }, selector);

    console.log(data);
    browser.close();
  } catch {
    console.error("Something went wrong.");
  }
})();
