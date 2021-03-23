import stencila from '@stencila/schema'
import fs from 'fs-extra'
import * as vfile from '../../util/vfile'
import { fixture, snapshot } from '../../__tests__/helpers'
import { JsonCodec } from '../json'
import { decodeMeta, emptyAttrs, encodeMeta, PandocCodec, run } from './'
import * as Pandoc from './types'

const pandoc = new PandocCodec()
const { decode, encode } = pandoc
const json = new JsonCodec()

const pdoc2node = async (pdoc: any) =>
  await decode(vfile.load(JSON.stringify(pdoc)))
const node2pdoc = async (node: any) =>
  JSON.parse(await vfile.dump(await encode(node)))
const decodeFixture = async (name: string) =>
  await decode(await vfile.read(fixture(name)))

test('decode', async () => {
  let got = await pdoc2node(kitchenSink.pdoc)
  expect(got).toEqual(kitchenSink.node)

  expect(await pdoc2node(collapseSpaces.pdoc)).toEqual(collapseSpaces.node)
  expect(await pdoc2node(imageInlinesToString.pdoc)).toEqual(
    imageInlinesToString.node
  )
})

test('encode', async () => {
  let got = await node2pdoc(kitchenSink.node)
  expect(got).toEqual(kitchenSink.pdoc)
})

test('metadata', async () => {
  const meta = {
    null: null,
    boolean: false,
    number: 3.14,
    array: [1, 2, 3.14],
    object: { a: true, b: 'two' },
    inlines: {
      type: 'Paragraph',
      content: ['Hello'],
    },
    blocks: [
      {
        type: 'Paragraph',
        content: ['World'],
      },
    ],
  }
  const pmeta: Pandoc.Meta = {
    null: { t: 'MetaString', c: '!!null' },
    boolean: { t: 'MetaBool', c: false },
    number: { t: 'MetaString', c: '!!number 3.14' },
    array: {
      t: 'MetaList',
      c: [
        {
          c: '1',
          t: 'MetaString',
        },
        {
          c: '2',
          t: 'MetaString',
        },
        {
          c: '!!number 3.14',
          t: 'MetaString',
        },
      ],
    },
    object: {
      t: 'MetaMap',
      c: {
        a: {
          c: true,
          t: 'MetaBool',
        },
        b: {
          c: 'two',
          t: 'MetaString',
        },
      },
    },
    inlines: {
      t: 'MetaInlines',
      c: [{ t: 'Str', c: 'Hello' }],
    },
    blocks: {
      t: 'MetaList',
      c: [{ t: 'MetaInlines', c: [{ t: 'Str', c: 'World' }] }],
    },
  }

  const encoded = await encodeMeta(meta)
  const decoded = await decodeMeta(pmeta)

  expect(encoded).toEqual(pmeta)
  expect(decoded).toEqual(meta)
})

describe('citations and references', () => {
  /**
   * Simple tests that decoding from Pandoc JSON works
   * as expected.
   */
  test('decoding', async () => {
    expect(
      await json.dump(await decodeFixture('cite.pandoc.json'))
    ).toMatchFile(snapshot('cite.json'))
    expect(
      await json.dump(await decodeFixture('cite-bib-file.pandoc.json'))
    ).toMatchFile(snapshot('cite-bib-file.json'))
  })

  /**
   * Test that `useCiteproc` works eg. that `pandoc-citeproc`
   * binary is found. Expects the references section to be populated.
   * Use `--eol=lf` to avoid difference to snapshot on Windows.
   */
  test('encoding', async () => {
    const pandocJson = await fs.readFile(fixture('cite-refs.pandoc.json'))
    const html = await run(
      pandocJson,
      ['--from=json', '--to=html', '--eol=lf'],
      true
    )
    expect(html).toMatchFile(snapshot('cite-refs.html'))
  })
})

describe('math', () => {
  const article = stencila.article({
    content: [
      stencila.paragraph({
        content: [
          'Some inline math ',
          stencila.mathFragment({ text: 'a' }),
          '. And some block math:',
        ],
      }),
      stencila.mathBlock({ text: 'e = mc^2' }),
    ],
  })

  test('decoding', async () => {
    expect(await decodeFixture('math.pandoc.json')).toEqual(article)
  })

  test('decoding', async () => {
    expect(await pandoc.dump(article)).toMatchFile(snapshot('math.pandoc.json'))
  })
})

interface testCase {
  pdoc: Pandoc.Document
  node: stencila.Article
}

// Shorthands for creating Pandoc elements
const str = (str: string): Pandoc.Str => ({ t: 'Str', c: str })
const space = (): Pandoc.Space => ({ t: 'Space', c: undefined })

// A test intended to have with at least one example of each
// Pandoc element type (we'll add them over time :)
const kitchenSink: testCase = {
  pdoc: {
    'pandoc-api-version': [1, 20],
    meta: {
      title: {
        t: 'MetaString',
        c: 'The title',
      },
      authors: {
        t: 'MetaList',
        c: [
          {
            t: 'MetaMap',
            c: {
              type: { t: 'MetaString', c: 'Person' },
              givenNames: {
                t: 'MetaList',
                c: [{ t: 'MetaString', c: 'Jane' }],
              },
              familyNames: {
                t: 'MetaList',
                c: [{ t: 'MetaString', c: 'Jones' }],
              },
            },
          },
        ],
      },
    },
    blocks: [
      {
        t: 'Header',
        c: [1, emptyAttrs, [str('Heading one')]],
      },
      {
        t: 'Header',
        c: [2, emptyAttrs, [str('Heading two')]],
      },
      {
        t: 'Para',
        c: [
          str('A paragraph with '),
          { t: 'Emph', c: [str('emphasis')] },
          str(' and '),
          { t: 'Strong', c: [str('strong')] },
          str(' and '),
          { t: 'Strikeout', c: [str('delete')] },
          str(' and '),
          {
            t: 'Quoted',
            c: [{ t: Pandoc.QuoteType.SingleQuote }, [str('quote')]],
          },
          str(' and '),
          { t: 'Code', c: [['', ['r'], []], 'code'] },
          str(' and '),
          { t: 'Link', c: [emptyAttrs, [], ['url', 'title']] },
          str(' and '),
          {
            t: 'Image',
            c: [
              emptyAttrs,
              [str('alt text')],
              ['http://example.org/image.png', 'title'],
            ],
          },
          str('.'),
        ],
      },
      {
        t: 'BlockQuote',
        c: [{ t: 'Para', c: [str('A blockquote')] }],
      },
      {
        t: 'CodeBlock',
        c: [['', ['python'], []], '# A code block'],
      },
      {
        t: 'BulletList',
        c: [
          [{ t: 'Para', c: [str('Item one')] }],
          [{ t: 'Para', c: [str('Item two')] }],
        ],
      },
      {
        t: 'OrderedList',
        c: [
          [
            1,
            { t: Pandoc.ListNumberStyle.DefaultStyle },
            { t: Pandoc.ListNumberDelim.DefaultDelim },
          ],
          [
            [{ t: 'Para', c: [str('First item')] }],
            [{ t: 'Para', c: [str('Second item')] }],
          ],
        ],
      },
      {
        t: 'Table',
        c: [
          [],
          [
            {
              t: Pandoc.Alignment.AlignDefault,
            },
            {
              t: Pandoc.Alignment.AlignDefault,
            },
            {
              t: Pandoc.Alignment.AlignDefault,
            },
          ],
          [0, 0, 0],
          [
            [{ t: 'Para', c: [{ t: 'Str', c: 'A' }] }],
            [{ t: 'Para', c: [{ t: 'Str', c: 'B' }] }],
            [{ t: 'Para', c: [{ t: 'Str', c: 'C' }] }],
          ],
          [
            [
              [{ t: 'Para', c: [{ t: 'Str', c: '1' }] }],
              [{ t: 'Para', c: [{ t: 'Str', c: '2' }] }],
              [{ t: 'Para', c: [{ t: 'Str', c: '3' }] }],
            ],
            [
              [{ t: 'Para', c: [{ t: 'Str', c: '4' }] }],
              [{ t: 'Para', c: [{ t: 'Str', c: '5' }] }],
              [{ t: 'Para', c: [{ t: 'Str', c: '6' }] }],
            ],
          ],
        ],
      },
      {
        t: 'HorizontalRule',
        c: undefined,
      },
    ],
  },
  node: {
    type: 'Article',
    title: 'The title',
    authors: [
      {
        type: 'Person',
        givenNames: ['Jane'],
        familyNames: ['Jones'],
      },
    ],
    content: [
      {
        type: 'Heading',
        depth: 1,
        content: ['Heading one'],
      },
      {
        type: 'Heading',
        depth: 2,
        content: ['Heading two'],
      },
      {
        type: 'Paragraph',
        content: [
          'A paragraph with ',
          { type: 'Emphasis', content: ['emphasis'] },
          ' and ',
          { type: 'Strong', content: ['strong'] },
          ' and ',
          { type: 'Delete', content: ['delete'] },
          ' and ',
          { type: 'Quote', content: ['quote'] },
          ' and ',
          { type: 'CodeFragment', programmingLanguage: 'r', text: 'code' },
          ' and ',
          {
            type: 'Link',
            content: [],
            title: 'title',
            target: 'url',
          },
          ' and ',
          {
            type: 'ImageObject',
            contentUrl: 'http://example.org/image.png',
            title: 'title',
            text: 'alt text',
          },
          '.',
        ],
      },
      {
        type: 'QuoteBlock',
        content: [
          {
            type: 'Paragraph',
            content: ['A blockquote'],
          },
        ],
      },
      {
        type: 'CodeBlock',
        programmingLanguage: 'python',
        text: '# A code block',
      },
      {
        type: 'List',
        order: 'unordered',
        items: [
          {
            type: 'ListItem',
            content: [{ type: 'Paragraph', content: ['Item one'] }],
          },
          {
            type: 'ListItem',
            content: [{ type: 'Paragraph', content: ['Item two'] }],
          },
        ],
      },
      {
        type: 'List',
        order: 'ascending',
        items: [
          {
            type: 'ListItem',
            content: [{ type: 'Paragraph', content: ['First item'] }],
          },
          {
            type: 'ListItem',
            content: [{ type: 'Paragraph', content: ['Second item'] }],
          },
        ],
      },
      {
        type: 'Table',
        rows: [
          {
            type: 'TableRow',
            rowType: 'header',
            cells: [
              {
                content: [{ type: 'Paragraph', content: ['A'] }],
                cellType: 'header',
                type: 'TableCell',
              },
              {
                content: [{ type: 'Paragraph', content: ['B'] }],
                cellType: 'header',
                type: 'TableCell',
              },
              {
                content: [{ type: 'Paragraph', content: ['C'] }],
                cellType: 'header',
                type: 'TableCell',
              },
            ],
          },
          {
            type: 'TableRow',
            cells: [
              {
                content: [{ type: 'Paragraph', content: ['1'] }],
                type: 'TableCell',
              },
              {
                content: [{ type: 'Paragraph', content: ['2'] }],
                type: 'TableCell',
              },
              {
                content: [{ type: 'Paragraph', content: ['3'] }],
                type: 'TableCell',
              },
            ],
          },
          {
            type: 'TableRow',
            cells: [
              {
                content: [{ type: 'Paragraph', content: ['4'] }],
                type: 'TableCell',
              },
              {
                content: [{ type: 'Paragraph', content: ['5'] }],
                type: 'TableCell',
              },
              {
                content: [{ type: 'Paragraph', content: ['6'] }],
                type: 'TableCell',
              },
            ],
          },
        ],
      },
      {
        type: 'ThematicBreak',
      },
    ],
  },
}

// Check that adjacent `Str` and `Space` elements are collapsed
const collapseSpaces: testCase = {
  pdoc: {
    'pandoc-api-version': Pandoc.Version,
    meta: {},
    blocks: [
      {
        t: 'Para',
        c: [
          str('One'),
          space(),
          str('two'),
          str(' three'),
          space(),
          space(),
          str('four.'),
          space(),
          { t: 'Strong', c: [str('Strong then space')] },
          space(),
          str('.'),
        ],
      },
    ],
  },
  node: {
    type: 'Article',
    content: [
      {
        type: 'Paragraph',
        content: [
          'One two three  four. ',
          { type: 'Strong', content: ['Strong then space'] },
          ' .',
        ],
      },
    ],
  },
}

// Test that where necessary Pandoc inline nodes are decoded to strings
const imageInlinesToString: testCase = {
  pdoc: {
    'pandoc-api-version': Pandoc.Version,
    meta: {},
    blocks: [
      {
        t: 'Para',
        c: [
          {
            t: 'Image',
            c: [
              emptyAttrs,
              [
                {
                  t: 'Emph',
                  c: [str('emphasis')],
                },
                {
                  t: 'Space',
                  c: undefined,
                },
                {
                  t: 'Strong',
                  c: [str('strong')],
                },
                {
                  t: 'Space',
                  c: undefined,
                },
                {
                  t: 'Quoted',
                  c: [{ t: Pandoc.QuoteType.SingleQuote }, [str('quoted')]],
                },
              ],
              ['http://example.org/image.png', 'title'],
            ],
          },
        ],
      },
    ],
  },
  node: {
    type: 'Article',
    content: [
      {
        type: 'Paragraph',
        content: [
          {
            type: 'ImageObject',
            contentUrl: 'http://example.org/image.png',
            title: 'title',
            text: 'emphasis strong quoted',
          },
        ],
      },
    ],
  },
}

// A very simple test of the approach to typing Pandoc nodes
test('types', () => {
  const str: Pandoc.Str = {
    t: 'Str',
    c: 'A string',
  }

  let para: Pandoc.Para = {
    t: 'Para',
    c: [
      str,
      {
        t: 'Str',
        c: ' and another.',
      },
    ],
  }

  // Should create error: Property 'c' is missing in type '{ t: "Para"; }' but required in type....
  // para = {t: 'Para'}

  const meta: Pandoc.Meta = {
    key: {
      t: 'MetaList',
      c: [
        {
          t: 'MetaBool',
          c: true,
        },
      ],
    },
  }

  const blocks: Pandoc.Block[] = [
    para,
    {
      t: 'BlockQuote',
      c: [],
    },
    // Should create error: Type '"Str"' is not assignable to type '"Para" ...
    // {t: 'Str'}
  ]

  const doc: Pandoc.Document = {
    'pandoc-api-version': Pandoc.Version,
    meta,
    blocks,
  }
})
