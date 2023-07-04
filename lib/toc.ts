import { toc } from 'mdast-util-toc'

/*
mdast-util-toc: This is a utility library for working with Markdown Abstract Syntax Trees (MDAST). 
It provides a function called toc that generates a table of contents from an MDAST tree.
*/
import { Node } from 'mdast-util-toc/lib'
/*
remark: This is a JavaScript library for working with Markdown. 
It provides a framework for parsing, transforming, and serializing Markdown documents.
*/
import { remark } from 'remark'
/*
unist-util-visit: This is a utility library for working with unified syntax trees (unist). 
It provides a function called visit that traverses a unist tree and calls a callback function for each node that matches a given selector.
*/
import { visit } from 'unist-util-visit'

/*
In the toc.ts file, we're using these libraries to generate a table of contents from a Markdown string. 
We're using remark to parse the Markdown string into an MDAST tree, 
mdast-util-toc to generate the table of contents from the MDAST tree, 
and unist-util-visit to traverse the MDAST tree and extract the table of contents items.
*/

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode']

// Define a function that flattens a node into a string
function flattenNode(node: any) {
  // Create an empty array to store the node's values
  const values: any = []
  // Traverse the node's children using the unist-util-visit library
  visit(node, (child) => {
    // If the child is not a text node, skip it
    if (!textTypes.includes(child.type)) return
    // Add the child's value to the array
    values.push(child.value)
  })
  // Join the array into a string and return it
  return values.join('')
}

interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

function getItems(node: any, current: any): Items {
  if (!node) {
    return {}
  }

  if (node.type === 'paragraph') {
    visit(node, (item) => {
      if (item.type === 'link') {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === 'text') {
        current.title = flattenNode(node)
      }
    })

    return current
  }

  if (node.type === 'list') {
    current.items = node.children.map((i: any) => getItems(i, {}))

    return current
  } else if (node.type === 'listItem') {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

const getToc = () => (node: Node, file: { data: Items }) => {
  const table = toc(node)
  file.data = getItems(table.map, {})
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content)

  return result.data
}
