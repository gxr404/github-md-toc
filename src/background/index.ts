import browser from 'webextension-polyfill'
import { sendMessage } from 'webext-bridge'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let preUrl = ''
/**
* 监听tab页面变化(用于处理页面logo问题)
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo?.status === 'complete') {
    const urlObj = new URL(tab.url || '')
    const tabUrl = `${urlObj.origin}/${urlObj.pathname}`
    if (preUrl !== tabUrl) {
      preUrl = tabUrl || ''
      sendMessage('tab-url-change', {
        title: tab.title,
        url: tabUrl,
      }, {
        context: 'content-script', tabId,
      })
    }
  }
})

