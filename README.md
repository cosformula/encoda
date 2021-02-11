# Encoda

##### Codecs for structured, semantic, composable, and executable documents

[![Build status](https://dev.azure.com/stencila/stencila/_apis/build/status/stencila.encoda?branchName=master)](https://dev.azure.com/stencila/stencila/_build/latest?definitionId=1&branchName=master)
[![Code coverage](https://codecov.io/gh/stencila/encoda/branch/master/graph/badge.svg)](https://codecov.io/gh/stencila/encoda)
[![NPM](https://img.shields.io/npm/v/@stencila/encoda.svg?style=flat)](https://www.npmjs.com/package/@stencila/encoda)
[![Contributors](https://img.shields.io/badge/contributors-6-orange.svg)](#contribute)
[![Docs](https://img.shields.io/badge/docs-latest-blue.svg)](https://stencila.github.io/encoda/)
[![Chat](https://badges.gitter.im/stencila/stencila.svg)](https://gitter.im/stencila/stencila)

<!-- Automatically generated TOC. Don't edit, `make docs` instead>

<!-- toc -->

- [Encoda](#encoda) - [Codecs for structured, semantic, composable, and executable documents](#codecs-for-structured-semantic-composable-and-executable-documents)
  - [Introduction](#introduction)
  - [Formats](#formats)
  - [Publishers](#publishers)
  - [Install](#install)
  - [Use](#use)
    - [Converting files](#converting-files)
    - [Converting folders](#converting-folders)
    - [Converting command line input](#converting-command-line-input)
    - [Creating zip archives](#creating-zip-archives)
    - [Using with Executa](#using-with-executa)
  - [Documentation](#documentation)
  - [Develop](#develop)
  - [Testing](#testing)
    - [Running tests locally](#running-tests-locally)
    - [Running test in Docker](#running-test-in-docker)
  - [Writing tests](#writing-tests)
    - [Recording and using network fixtures](#recording-and-using-network-fixtures)
  - [Contribute](#contribute)
  - [Contributors](#contributors)
  - [Acknowledgments](#acknowledgments)

<!-- tocstop -->

## Introduction

> "A codec is a device or computer program for encoding or decoding a digital data stream or signal. Codec is a portmanteau of coder-decoder. - [Wikipedia](https://en.wikipedia.org/wiki/Codec)

Encoda provides a collection of codecs for converting between, and composing together, documents in various formats. The aim is not to achieve perfect lossless conversion between alternative document formats; there are already several tools for that. Instead the focus of Encoda is to use existing tools to encode and compose semantic documents in alternative formats.

## Formats

| Format                      | Codec         | Approach | Status | Issues                  | Coverage             |
| --------------------------- | ------------- | -------- | ------ | ----------------------- | -------------------- |
| **Text**                    |
| Plain text                  | [txt]         | None     | β      | [⚠][txt-issues]         | ![][txt-cov]         |
| Markdown                    | [md]          | Extens   | α      | [⚠][md-issues]          | ![][md-cov]          |
| LaTex                       | [latex]       | -        | α      | [⚠][latex-issues]       | ![][latex-cov]       |
| Microsoft Word              | [docx]        | rPNG     | α      | [⚠][docx-issues]        | ![][docx-cov]        |
| Google Docs                 | [gdoc]        | rPNG     | α      | [⚠][gdoc-issues]        | ![][gdoc-cov]        |
| Open Document Text          | [odt]         | rPNG     | α      | [⚠][odt-issues]         | ![][odt-cov]         |
| HTML                        | [html]        | Extens   | α      | [⚠][html-issues]        | ![][html-cov]        |
| JATS XML                    | [jats]        | Extens   | α      | [⚠][jats-issues]        | ![][jats-cov]        |
| JATS XML (Pandoc-based)     | [jats-pandoc] | Extens   | α      | [⚠][jats-pandoc-issues] | ![][jats-pandoc-cov] |
| Portable Document Format    | [pdf]         | rPNG     | α      | [⚠][pdf-issues]         | ![][pdf-cov]         |
| **Notebooks**               |
| Jupyter                     | [ipynb]       | Native   | α      | [⚠][ipynb-issues]       | ![][ipynb-cov]       |
| RMarkdown                   | [xmd]         | Native   | α      | [⚠][xmd-issues]         | ![][xmd-cov]         |
| **Presentations**           |
| Microsoft Powerpoint        | [pptx]        | rPNG     | ✗      | [⚠][pptx-issues]        |
| Demo Magic                  | [dmagic]      | Native   | β      | [⚠][dmagic-issues]      | ![][dmagic-cov]      |
| **Spreadsheets**            |
| Microsoft Excel             | [xlsx]        | Formula  | β      | [⚠][xlsx-issues]        | ![][xlsx-cov]        |
| Google Sheets               | [gsheet]      | Formula  | ✗      | [⚠][gsheet-issues]      |
| Open Document Spreadsheet   | [ods]         | Formula  | β      | [⚠][ods-issues]         | ![][ods-cov]         |
| **Tabular data**            |
| CSV                         | [csv]         | None     | β      | [⚠][csv-issues]         | ![][csv-cov]         |
| CSVY                        | [csvy]        | None     | ✗      | [⚠][csvy-issues]        |
| Tabular Data Package        | [tdp]         | None     | β      | [⚠][tdp-issues]         | ![][tdp-cov]         |
| **Collections**             |
| Document Archive            | [dar]         | Extens   | ω      | [⚠][dar-issues]         | ![][dar-cov]         |
| Filesystem Directory        | [dir]         | Extens   | ω      | [⚠][dir-issues]         | ![][dir-cov]         |
| **Data interchange, other** |
| JSON                        | [json]        | Native   | ✔      | [⚠][json-issues]        | ![][json-cov]        |
| JSON-LD                     | [json-ld]     | Native   | ✔      | [⚠][jsonld-issues]      | ![][jsonld-cov]      |
| JSON5                       | [json5]       | Native   | ✔      | [⚠][json5-issues]       | ![][json5-cov]       |
| YAML                        | [yaml]        | Native   | ✔      | [⚠][yaml-issues]        | ![][yaml-cov]        |
| Pandoc                      | [pandoc]      | Native   | β      | [⚠][pandoc-issues]      | ![][pandoc-cov]      |
| Reproducible PNG            | [rpng]        | Native   | β      | [⚠][rpng-issues]        | ![][rpng-cov]        |
| XML                         | [xml]         | Native   | ✔      |                         | ![][xml-cov]         |
| **Transport**               |
| HTTP                        | [http]        |          | ✔      | [⚠][http-issues]        | ![][http-cov]        |

**Key**

<details>
  <summary><b id="format-approach">Approach</b>...</summary>
  How executable nodes (e.g. `CodeChunk` and `CodeExpr` nodes) are represented

- Native: the format natively supports executable nodes
- Extens.: executable nodes are supported via extensions to the format
- rPNG: executable nodes are supported via reproducible PNG images
- Formula: executable `CodeExpr` nodes are represented using formulae

</details>

<details>
  <summary><b id="format-status">Status</b>...</summary>

- ✗: Not yet implemented
- ω: Work in progress
- α: Alpha, initial implementation
- β: Beta, ready for user testing
- ✔: Ready for production use

</details>

<details>
  <summary><b id="format-issues">Issues</b>...</summary>
  Link to open issues and PRs for the format (please check there before submitting a new issue 🙏)
</details>

If you'd like to see a converter for your favorite format, look at the [listed issues](https://github.com/stencila/encoda/issues) and comment under the relevant one. If there is no issue regarding the converter you need, [create one](https://github.com/stencila/encoda/issues/new).

## Publishers

Several of the codecs in Encoda, deal with fetching content from a particular publisher. For example, to get an eLife article and read it in Markdown:

```bash
stencila convert https://elifesciences.org/articles/45187v2 ye-et-al-2019.md
```

Some of these publisher codecs deal with meta data. e.g.

```bash
stencila convert "Watson and Crick 1953" - --from crossref --to yaml
```

```yaml
type: Article
title: Genetical Implications of the Structure of Deoxyribonucleic Acid
authors:
  - familyNames:
      - WATSON
    givenNames:
      - J. D.
    type: Person
  - familyNames:
      - CRICK
    givenNames:
      - F. H. C.
    type: Person
datePublished: '1953,5'
isPartOf:
  issueNumber: '4361'
  isPartOf:
    volumeNumber: '171'
    isPartOf:
      title: Nature
      type: Periodical
    type: PublicationVolume
  type: PublicationIssue
```

| Source                 | Codec      | Base codec/s                         | Status | Issues               | Coverage          |
| ---------------------- | ---------- | ------------------------------------ | ------ | -------------------- | ----------------- |
| **General**            |
| HTTP                   | [http]     | Based on `Content-Type` or extension | β      | [⚠][http-issues]     | ![][http-cov]     |
| **`Person`**           |
| ORCID                  | [orcid]    | `jsonld`                             | β      | [⚠][orcid-issues]    | ![][orcid-cov]    |
| **`Article` metadata** |
| DOI                    | [doi]      | `csl`                                | β      | [⚠][doi-issues]      | ![][doi-cov]      |
| Crossref               | [crossref] | `jsonld`                             | β      | [⚠][crossref-issues] | ![][crossref-cov] |
| **`Article` content**  |
| eLife                  | [elife]    | `jats`                               | β      | [⚠][elife-issues]    | ![][elife-cov]    |
| PLoS                   | [plos]     | `jats`                               | β      | [⚠][plos-issues]     | ![][plos-cov]     |

## Install

The easiest way to use Encoda is to install the [`stencila` command line tool](https://github.com/stencila/stencila). Encoda powers `stencila convert`, and other commands, in that CLI. However, the version of Encoda in `stencila`, can lag behind the version in this repo. So if you want the latest functionality, install Encoda as a Node.js package:

```bash
npm install @stencila/encoda --global
```

## Use

Encoda is intended to be used primarily as a library for other applications. However, it comes with a simple command line script which allows you to use the `convert` function directly.

### Converting files

```bash
encoda convert notebook.ipynb notebook.docx
```

Encoda will determine the input and output formats based on the file extensions. You can override these using the `--from` and `--to` options. e.g.

```bash
encoda convert notebook.ipynb notebook.xml --to jats
```

You can also convert to more than one file / format (in this case the `--to` argument only applies to the first output file) e.g.

```bash
encoda convert report.docx report.Rmd report.html report.jats
```

### Converting folders

You can decode an entire directory into a `Collection`. Encoda will traverse the directory, including subdirectories, decoding each file matching your glob pattern. You can then encode the `Collection` using the `dir` codec into a tree of HTML files e.g.

```bash
encoda convert myproject myproject-published --to dir --pattern '**/*.{rmd, csv}'
```

### Converting command line input

You can also read content from the first argument. In that case, you'll need to specifying the `--from` format e.g.

```bash
encoda convert "{type: 'Paragraph', content: ['Hello world!']}" --from json5 paragraph.md
```

You can send output to the console by using `-` as the second argument and specifying the `--to` format e.g.

```bash
encoda convert paragraph.md - --to yaml
```

### Creating zip archives

Use the `--zip` option to create a Zip archive with the outputs of conversion. With `--zip=yes` a zip archive will always be created. With `--zip=maybe`, a zip archive will be created if there are more than two output files. This can be useful for formats such as HTML and Markdown, for which images and other media are stored in a sibling folder.

| Option         | Description                                                                                                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--from`       | The format of the input content e.g. `--from md`                                                                                                                                                                                                         |
| `--to`         | The format for the output content e.g. `--to html`                                                                                                                                                                                                       |
| `--theme`      | The theme for the output (only applies to HTML, PDF and RPNG output) e.g. `--theme eLife`. Either a [Thema theme name](https://github.com/stencila/thema#available-themes) or a path/URL to a directory containing a `styles.css` and a `index.js` file. |
| `--standalone` | Generate a standalone document, not a fragment (default `true`)                                                                                                                                                                                          |
| `--bundle`     | Bundle all assets (e.g images, CSS and JS) into the document (default `false`)                                                                                                                                                                           |
| `--debug`      | Print debugging information                                                                                                                                                                                                                              |

### Using with Executa

Encoda exposes the `decode` and `encode` methods of the [Executa](https://github.com/stencila/executa) API. Register Encoda so that it can be discovered by other executors on your machine,

```bash
npm run register
```

You can then use Encoda as a plugin for Executa that provides additional format conversion capabilities. For example, you can use the `query` REPL on a Markdown document:

```bash
npx executa query CHANGELOG.md --repl
```

You can then use the REPL to explore the structure of the document and do things like create summary documents from it. For example, lets say from some reason we wanted to create a short JATS XML file with the five most recent releases of this package:

```
jmp > %format jats
jmp > %dest latest-releases.jats.xml
jmp > {type: 'Article', content: content[? type==`Heading` && depth==`1`] | [1:5]}
```

Which creates the `latest-major-releases.jats.xml` file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Archiving and Interchange DTD v1.1 20151215//EN" "JATS-archivearticle1.dtd">
<article xmlns:xlink="http://www.w3.org/1999/xlink" article-type="research-article">
    <front>
        <title-group>
            <article-title/>
        </title-group>
        <contrib-group/>
    </front>
    <body>
        <sec>
            <title>
                <ext-link ext-link-type="uri" xlink:href="https://github.com/stencila/encoda/compare/v0.79.0...v0.80.0">0.80.0</ext-link> (2019-09-30)
            </title>
        </sec>
...
```

You can query a document in any format supported by Encoda. As another example, lets' fetch a CSV file from Github and get the names of it's columns:

```bash
npx executa query https://gist.githubusercontent.com/jncraton/68beb88e6027d9321373/raw/381dcf8c0d4534d420d2488b9c60b1204c9f4363/starwars.csv --repl
🛈 INFO  encoda:http Fetching "https://gist.githubusercontent.com/jncraton/68beb88e6027d9321373/raw/381dcf8c0d4534d420d2488b9c60b1204c9f4363/starwars.csv"
jmp > columns[].name
[
  'SetID',
  'Number',
  'Variant',
  'Theme',
  'Subtheme',
  'Year',
  'Name',
  'Minifigs',
  'Pieces',
  'UKPrice',
  'USPrice',
  'CAPrice',
  'EUPrice',
  'ImageURL',
  'Owned',
  'Wanted',
  'QtyOwned',
]
jmp >
```

See the `%help` REPL command for more examples.

Note: If you have [`executa`](https://github.com/stencila/executa) installed globally, then the `npx` prefix above is not necessary.

## Documentation

Self-hoisted (documentation converted from various formats to html) and API documentation (generated from source code) is available at: https://stencila.github.io/encoda.

## Develop

Check how to [contribute back to the project](https://github.com/stencila/encoda/blob/master/CONTRIBUTING.md). All PRs are most welcome! Thank you!

Clone the repository and install a development environment:

```bash
git clone https://github.com/stencila/encoda.git
cd encoda
npm install
```

You can manually test conversion using the `ts-node` and the `cli.ts` script:

```bash
npm run cli -- convert simple.md simple.html
```

There is a bash script to make that a little shorter and more like real life usage:

```bash
./encoda convert simple.md simple.html
```

If that is a bit slow, compile the Typescript to Javascript first and use `node` directly:

```bash
npm run build
node dist/cli convert simple.md simple.html
```

If you are using VSCode, you can use the [Auto Attach feature](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_auto-attach-feature) to attach to the CLI when running the `cli:debug` NPM script:

```bash
npm run cli:debug -- convert simple.gdoc simple.ipynb
```

## Testing

### Running tests locally

Run the test suite using:

```bash
npm test
```

Or, run a single test file e.g.

```bash
npx jest tests/xlsx.test.ts --watch
```

To display debug logs during testing set the environment variable `DEBUG=1`, e.g.

```bash
DEBUG=1 npm test
```

To get coverage statistics:

```bash
npm run cover
```

There's also a `Makefile` if you prefer to run tasks that way e.g.

```bash
make lint cover
```

### Running test in Docker

You can also test this package using with a Docker container:

```bash
npm run test:docker
```

## Writing tests

#### Recording and using network fixtures

As far as possible, tests should be able to run with no network access. We use [Nock Back](https://github.com/nock/nock#nock-back) to record and play back network requests and responses. Use the `nockRecord` helper function for this with the convention of starting the fixture file with `nock-record-` e.g.

```ts
const stopRecording = await nockRecord('nock-record-<name-of-test>.json')
// Do some things that connect to the interwebs
stopRecording()
```

Note that the `util/http` module has caching so that you may need to remove the cache for the recording of fixtures to work e.g. `rm -rf ~/.config/stencila/encoda/cache/`

As part of continuous integration, tests are run with both `NOCK_MODE=wild` (which ignores recording) to test that tests still work when using real network connections, and `NOCK_MODE=dryrun` (for speed and consistency with the default).

## Contribute

We 💕 contributions! All contributions: ideas 🤔, examples 💡, bug reports 🐛, documentation 📖, code 💻, questions 💬. See [CONTRIBUTING.md](CONTRIBUTING.md) for more on where to start. You can also provide your feedback on the [Community Forum](https://community.stenci.la)
and [Gitter channel](https://gitter.im/stencila/stencila).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://stenci.la"><img src="https://avatars2.githubusercontent.com/u/2358535?v=4" width="50px;" alt=""/><br /><sub><b>Aleksandra Pawlik</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=apawlik" title="Code">💻</a> <a href="https://github.com/stencila/encoda/commits?author=apawlik" title="Documentation">📖</a> <a href="https://github.com/stencila/encoda/issues?q=author%3Aapawlik" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nokome"><img src="https://avatars0.githubusercontent.com/u/1152336?v=4" width="50px;" alt=""/><br /><sub><b>Nokome Bentley</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=nokome" title="Code">💻</a> <a href="https://github.com/stencila/encoda/commits?author=nokome" title="Documentation">📖</a> <a href="https://github.com/stencila/encoda/issues?q=author%3Anokome" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://toki.io"><img src="https://avatars1.githubusercontent.com/u/10161095?v=4" width="50px;" alt=""/><br /><sub><b>Jacqueline</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=jwijay" title="Documentation">📖</a> <a href="#design-jwijay" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/hamishmack"><img src="https://avatars2.githubusercontent.com/u/620450?v=4" width="50px;" alt=""/><br /><sub><b>Hamish Mackenzie</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=hamishmack" title="Code">💻</a> <a href="https://github.com/stencila/encoda/commits?author=hamishmack" title="Documentation">📖</a></td>
    <td align="center"><a href="http://ketch.me"><img src="https://avatars2.githubusercontent.com/u/1646307?v=4" width="50px;" alt=""/><br /><sub><b>Alex Ketch</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=alex-ketch" title="Code">💻</a> <a href="https://github.com/stencila/encoda/commits?author=alex-ketch" title="Documentation">📖</a> <a href="#design-alex-ketch" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/beneboy"><img src="https://avatars1.githubusercontent.com/u/292725?v=4" width="50px;" alt=""/><br /><sub><b>Ben Shaw</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=beneboy" title="Code">💻</a> <a href="https://github.com/stencila/encoda/issues?q=author%3Abeneboy" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://humanrights.washington.edu"><img src="https://avatars2.githubusercontent.com/u/16355618?v=4" width="50px;" alt=""/><br /><sub><b>Phil Neff</b></sub></a><br /><a href="https://github.com/stencila/encoda/issues?q=author%3Aphilneff" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://rgaiacs.com"><img src="https://avatars0.githubusercontent.com/u/1506457?v=4" width="50px;" alt=""/><br /><sub><b>Raniere Silva</b></sub></a><br /><a href="https://github.com/stencila/encoda/commits?author=rgaiacs" title="Documentation">📖</a></td>
    <td align="center"><a href="https://people.unipi.it/lorenzo_cangiano/"><img src="https://avatars1.githubusercontent.com/u/11914162?v=4" width="50px;" alt=""/><br /><sub><b>Lorenzo Cangiano</b></sub></a><br /><a href="https://github.com/stencila/encoda/issues?q=author%3Alollopus" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/FAtherden-eLife"><img src="https://avatars2.githubusercontent.com/u/43879983?v=4" width="50px;" alt=""/><br /><sub><b>FAtherden-eLife</b></sub></a><br /><a href="https://github.com/stencila/encoda/issues?q=author%3AFAtherden-eLife" title="Bug reports">🐛</a> <a href="#design-FAtherden-eLife" title="Design">🎨</a></td>
    <td align="center"><a href="https://giorgiosironi.com"><img src="https://avatars3.githubusercontent.com/u/160299?v=4" width="50px;" alt=""/><br /><sub><b>Giorgio Sironi</b></sub></a><br /><a href="https://github.com/stencila/encoda/pulls?q=is%3Apr+reviewed-by%3Agiorgiosironi" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<details>
<summary><b id="format-approach">Add a contributor</b>...</summary>

To add youself, or someone else, to the above list, either,

1. Ask the [@all-contributors bot](https://allcontributors.org/docs/en/bot/overview) to do it for you by commenting on an issue or PR like this:

   > @all-contributors please add @octocat for bugs, tests and code

2. Use the [`all-contributors` CLI](https://allcontributors.org/docs/en/cli/overview) to do it yourself:

   ```bash
   npx all-contributors add octocat bugs, tests, code
   ```

See the list of [contribution types](https://allcontributors.org/docs/en/emoji-key).

</details>

## Acknowledgments

Encoda relies on many awesome opens source tools (see `package.json` for the complete list). We are grateful ❤ to their developers and contributors for all their time and energy. In particular, these tools do a lot of the heavy lifting 💪 under the hood.

| Tool                                                                                                               | Use                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Ajv](https://ajv.js.org/images/ajv_logo.png)                                                                     | [Ajv](https://ajv.js.org/) is "the fastest JSON Schema validator for Node.js and browser". Ajv is not only fast, it also has an impressive breadth of functionality. We use Ajv for the `validate()` and `coerce()` functions to ensure that ingested data is valid against the Stencila [schema](https://github.com/stencila/schema).                                                                                                                                                                                                                                                                         |
| ![Citation.js](https://avatars0.githubusercontent.com/u/41587916?s=200&v=4)                                        | [`Citation.js`](https://citation.js.org/) converts bibliographic formats like BibTeX, BibJSON, DOI, and Wikidata to CSL-JSON. We use it to power the codecs for those formats and APIs.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ![Frictionless Data](https://avatars0.githubusercontent.com/u/5912125?s=200&v=4)                                   | [`datapackage-js`](https://github.com/frictionlessdata/datapackage-js) from the team at [Frictionless Data](https://frictionlessdata.io/) is a Javascript library for working with [Data Packages](https://frictionlessdata.io/specs/data-package/). It does a lot of the work in converting between Tabular Data Packages and Stencila Datatables.                                                                                                                                                                                                                                                            |
| ![Glitch Digital](https://avatars1.githubusercontent.com/u/16604593?s=200&v=4)                                     | Glitch Digital's [`structured-data-testing-tool`](https://github.com/glitchdigital/structured-data-testing-tool) is a library and command line tool to help inspect and test for Structured Data. We use it to check that the HTML generated by Encoda can be read by bots 🤖                                                                                                                                                                                                                                                                                                                                  |
| ![Pa11y](https://pa11y.org/resources/brand/logo.svg)                                                               | [Pa11y](https://pa11y.org/) provides a range of free and open source tools to help designers and developers make their web pages more accessible. We use [`pa11y`](https://github.com/pa11y/pa11y) to test that HTML generated produced by Encoda meets the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG20/) and [Axe](https://dequeuniversity.com/rules/axe/3.5) rule set.                                                                                                                                                                                                        |
| **Pandoc**                                                                                                         | [Pandoc](https://pandoc.org/) is a "universal document converter". It's able to convert between an impressive number of formats for textual documents. Our [Typescript definitions for Pandoc's AST](https://github.com/stencila/encoda/blob/c400d798e6b54ea9f88972b038489df79e38895b/src/pandoc-types.ts) allow us to leverage this functionality from within Node.js while maintaining type safety. Pandoc powers our converters for Word, JATS and Latex. We have contributed to Pandoc, including developing its [JATS reader](https://github.com/jgm/pandoc/blob/master/src/Text/Pandoc/Readers/JATS.hs). |
| ![Puppeteer](https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png) | [Puppeteer](https://pptr.dev/) is a Node library which provides a high-level API to control Chrome. We use it to take screenshots of HTML snippets as part of generating rPNGs and we plan to use it for [generating PDFs](https://github.com/stencila/encoda/issues/53).                                                                                                                                                                                                                                                                                                                                      |
| ![Remark](https://avatars2.githubusercontent.com/u/16309564?s=200&v=4)                                             | [`Remark`](https://remark.js.org/) is an ecosystem of plugins for processing Markdown. It's part of the [unified](https://unifiedjs.github.io/) framework for processing text with syntax trees - a similar approach to Pandoc but in Javascript. We use Remark as our Markdown parser because of it's extensibility.                                                                                                                                                                                                                                                                                          |
| ![SheetJs](https://sheetjs.com/sketch128.png)                                                                      | [SheetJs](https://sheetjs.com) is a Javascript library for parsing and writing various spreadsheet formats. We use their [community edition](https://github.com/sheetjs/js-xlsx) to power converters for CSV, Excel, and Open Document Spreadsheet formats. They also have a [pro version](https://sheetjs.com/pro) if you need extra support and functionality.                                                                                                                                                                                                                                               |

Many thanks ❤ to the [Alfred P. Sloan Foundation](https://sloan.org) and [eLife](https://elifesciences.org) for funding development of this tool.

<p align="left">
  <img width="250" src="https://sloan.org/storage/app/media/Logos/Sloan-Logo-stacked-black-web.png">
  <img width="250" src="https://www.force11.org/sites/default/files/elife-full-color-horizontal.png">
</p>

[csv]: src/codecs/csv
[csvy]: src/codecs/csvy
[dar]: src/codecs/dar
[dir]: src/codecs/dir
[dmagic]: src/codecs/dmagic
[docx]: src/codecs/docx
[gdoc]: src/codecs/gdoc
[gsheet]: src/codecs/gsheet
[html]: src/codecs/html
[http]: src/codecs/http
[ipynb]: src/codecs/ipynb
[jats]: src/codecs/jats
[jats-pandoc]: src/codecs/jats-pandoc
[json]: src/codecs/json
[jsonld]: src/codecs/jsonld
[json5]: src/codecs/json5
[latex]: src/codecs/latex
[md]: src/codecs/md
[ods]: src/codecs/ods
[odt]: src/codecs/odt
[pandoc]: src/codecs/pandoc
[pdf]: src/codecs/pdf
[pptx]: src/codecs/pptx
[rpng]: src/codecs/rpng
[tdp]: src/codecs/tdp
[txt]: src/codecs/txt
[xlsx]: src/codecs/xlsx
[xmd]: src/codecs/xmd
[xml]: src/codecs/xml
[yaml]: src/codecs/yaml
[csv-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+csv
[csvy-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+csvy
[dar-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+dar
[dir-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+dir
[dmagic-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+dmagic
[docx-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+docx
[gdoc-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+gdoc
[gsheet-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+gsheet
[html-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+html
[http-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+http
[ipynb-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+ipynb
[jats-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+jats
[jats-pandoc-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+jats
[json-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+json
[json5-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+json5
[latex-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+tex
[md-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+markdown
[ods-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+ods
[odt-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+odt
[pandoc-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+pandoc
[pdf-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+pdf
[pptx-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+pptx
[rpng-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+rpng
[tdp-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+tdp
[txt-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+txt
[xlsx-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+xlsx
[xmd-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+rmd
[yaml-issues]: https://github.com/stencila/encoda/issues?q=is%3Aopen+yaml
[csv-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/csv
[csvy-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/csvy
[dar-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/dar
[dir-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/dir
[dmagic-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/dmagic
[docx-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/docx
[gdoc-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/gdoc
[gsheet-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/gsheet
[html-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/html
[http-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/http
[ipynb-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/ipynb
[jats-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/jats
[jats-pandoc-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/jats-pandoc
[json-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/json
[jsonld-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/jsonld
[json5-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/json5
[latex-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/latex
[md-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/md
[ods-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/ods
[odt-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/odt
[pandoc-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/pandoc
[pdf-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/pdf
[pptx-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/pptx
[rpng-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/rpng
[tdp-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/tdp
[txt-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/txt
[xlsx-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/xlsx
[xmd-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/xmd
[xml-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/xml
[yaml-cov]: https://badger.nokome.now.sh/codecov-folder/stencila/encoda/src/codecs/yaml
