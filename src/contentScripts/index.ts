/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import App from './views/App.vue'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  // communication example: send previous tab title from background page
  onMessage('tab-url-change', ({ data }) => {
    console.log('changeUrl', data)
  })

  // mount component to context window
  const container = document.createElement('div')
  const root = document.createElement('div')
  const linkStyleEl = document.createElement('link')
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  linkStyleEl.setAttribute('rel', 'stylesheet')
  linkStyleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  container.appendChild(linkStyleEl)
  container.appendChild(root)
  document.body.appendChild(container)
  createApp(App).mount(root)
})()
