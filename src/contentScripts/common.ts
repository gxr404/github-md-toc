export interface TocItem {
  text: string
  tag: string
  href: string
}

const PARSE_TAG = ['h1', 'h2', 'h3', 'h4']

export const parseHtmlToToc = (elSelector: string): TocItem[] => {
  const container = document.querySelector(elSelector)
  if (!container)
  { return [] }
  const itemNodeList = container.querySelectorAll(PARSE_TAG.toString()) || []
  const itemElList = Array.from(itemNodeList)
  return itemElList.map((el) => {
    return {
      tag: el.tagName.toLocaleLowerCase(),
      text: el.textContent || '',
      href: el.querySelector('a')?.getAttribute('href') || '',
    }
  })
}
