import { onMessage } from 'webext-bridge'
import { parseHtmlToToc } from '../common'
import type { TocItem } from '../common'

let isInit = true
const tocList = ref<TocItem[]>([])

export function useTocList() {
  const parse = () => {
    const articleTocList = parseHtmlToToc('article.markdown-body')
    if (!articleTocList.length) {
      const wikiTocList = parseHtmlToToc('#wiki-body .markdown-body')
      return wikiTocList
    }
    return articleTocList
  }

  const setTocList = (tocListData: TocItem[]) => {
    tocList.value = tocListData
  }

  if (isInit) {
    isInit = false
    onMounted(init)
  }
  function init() {
    const tocListData = parse()
    setTocList(tocListData)
    onMessage('tab-url-change', () => {
      setTimeout(() => {
        const tocListData = parse()
        setTocList(tocListData)
      }, 100)
    })
  }

  return {
    tocList,
    setTocList,
    parse,
  }
}
