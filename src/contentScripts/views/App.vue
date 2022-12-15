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
    class="fixed flex bottom-0 top-0 m0 bg-white z-1000000001 transition-all" :class="{
      'left--100%': !showSideBar,
      'left-0': showSideBar,
    }"
  >
    <div
      class="absolute right-20px top-30px w-20px text-size-30px lh-0 z-10 color-white cursor-pointer"
      @click="showSideBar = false"
    >
      ×
    </div>
    <ul
      ref="moveBarWarp"
      class="padding color-#0969da w-266px transition-all list-none p-16px h100% overflow-y-auto scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4"
    >
      <!-- 'pl font-700': item.tag === 'h1', -->
      <li class="sticky -top-16px text-center text-size-16px font-700 -ml-16px -mr-16px -mt-16px h-60px lh-60px color-white bg-#24292f">
        TOC
      </li>
      <li class="pt-2 pd-2 font-700 ">
        <a href="#">▲ GO TOP</a>
      </li>
      <li
        v-for="item in tocList"
        :key="item.href"
        class="pt-2 pd-2 truncate" :class="{
          'font-700': item.tag === 'h1',
          'pl-2 text-size-12px': item.tag === 'h2',
          'pl-4 text-size-12px': item.tag === 'h3',
          'pl-6 text-size-12px': item.tag === 'h4',
        }"
      >
        <a :href="item.href" :title="item.text">{{ item.text }}</a>
      </li>
    </ul>
    <div ref="moveBar" class="cursor-col-resize h100% absolute right-0 w1px bg-blueGray-2 z-90" />
  </div>
  <div
    v-if="!showSideBar && existTocList"
    class="fixed bg-#2da44e color-white left-0 top-50% z-1000000001 p-5px pt-8px pb-8px border-rounded-rt-6px border-rounded-rb-6px drop-shadow cursor-pointer"
    @click="showSideBar = true"
  >
    <div class="text-size-16px text-center ">
      ➜
    </div>
    <span class="write-vertical-right text-size-12px font-mono">OPEN-TOC</span>
  </div>
</template>
