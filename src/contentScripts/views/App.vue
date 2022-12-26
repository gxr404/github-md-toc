<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'
import { useTocList } from '../hooks/tocList'
import { useLateralMove } from '../hooks/lateralMove'

const [showSideBar] = useToggle(false)
const { tocList } = useTocList()
const existTocList = ref(false)

const moveBar = ref()
const moveBarWarp = ref()
const sidebarPosition = ref({
  x: 0,
  y: 0,
})

watch(tocList, (list) => {
  existTocList.value = list.length > 0
  if (list.length === 0) {
    showSideBar.value = false
  }
}, { deep: true })

onMounted(() => {
  if (moveBar.value) {
    const { position } = useLateralMove(moveBar.value)
    watch(position, () => {
      sidebarPosition.value.x = position.value.x
      sidebarPosition.value.y = position.value.y
      document.body.style.paddingLeft = `${position.value.x}px`
      moveBarWarp.value.style.width = `${position.value.x}px`
    }, { deep: true })

    watch(showSideBar, (newValue) => {
      const defaultPositionX = position.value.x > 0 ? position.value.x : 266
      document.body.style.paddingLeft = `${newValue ? defaultPositionX : 0}px`
    })
  }
})
</script>

<template>
  <div
    class="toc-fixed toc-flex toc-bottom-0 toc-top-0 m0 toc-bg-white toc-z-1000000001 toc-transition-all" :class="{
      'toc-left--100%': !showSideBar,
      'toc-left-0': showSideBar,
    }"
  >
    <div
      class="toc-absolute toc-right-20px toc-top-30px toc-w-20px toc-text-size-30px toc-lh-0 toc-z-10 toc-color-white toc-cursor-pointer"
      @click="showSideBar = false"
    >
      ×
    </div>
    <ul
      ref="moveBarWarp"
      class="toc-padding toc-color-#0969da toc-w-266px toc-transition-all toc-list-none toc-p-16px toc-h100% toc-overflow-y-auto toc-scrollbar toc-scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4"
    >
      <!-- 'pl font-700': item.tag === 'h1', -->
      <li class="toc-sticky -toc-top-16px toc-text-center toc-text-size-16px toc-font-700 -toc-ml-16px -toc-mr-16px -toc-mt-16px toc-h-60px toc-lh-60px toc-color-white toc-bg-#24292f">
        TOC
      </li>
      <li class="toc-pt-2 toc-pd-2 toc-font-700 ">
        <a href="#">▲ GO TOP</a>
      </li>
      <li
        v-for="item in tocList"
        :key="item.href"
        class="toc-pt-2 toc-pd-2 toc-truncate" :class="{
          'toc-font-700': item.tag === 'h1',
          'toc-pl-2 toc-text-size-12px': item.tag === 'h2',
          'toc-pl-4 toc-text-size-12px': item.tag === 'h3',
          'toc-pl-6 toc-text-size-12px': item.tag === 'h4',
        }"
      >
        <a :href="item.href" :title="item.text">{{ item.text }}</a>
      </li>
    </ul>
    <div ref="moveBar" class="toc-cursor-col-resize toc-h100% toc-absolute toc-right-0 toc-w1px toc-bg-blueGray-2 toc-z-90" />
  </div>
  <div
    v-if="!showSideBar && existTocList"
    class="toc-fixed toc-bg-#2da44e toc-color-white toc-left-0 toc-top-50% toc-z-1000000001 toc-p-5px toc-pt-8px toc-pb-8px toc-border-rounded-rt-6px toc-border-rounded-rb-6px toc-drop-shadow toc-cursor-pointer"
    @click="showSideBar = true"
  >
    <div class="toc-text-size-16px toc-text-center ">
      ➜
    </div>
    <span class="toc-write-vertical-right toc-text-size-12px toc-font-mono">OPEN-TOC</span>
  </div>
</template>
