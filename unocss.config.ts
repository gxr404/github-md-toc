import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetScrollbar({
      scrollbarTrackColor: 'transparent',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
