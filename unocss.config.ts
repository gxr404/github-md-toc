import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

function resolveVar(name: string) {
  const prefix = ''
  return `--${prefix ? `${prefix}-` : ''}scrollbar-${name}`
}

export default defineConfig({
  presets: [
    presetUno({
      prefix: 'toc-',
    }),
    presetAttributify(),
    presetIcons(),
    presetScrollbar({
      scrollbarTrackColor: 'transparent',
    }),
  ],
  shortcuts: [
    [
      'toc-scrollbar', `
        scrollbar-custom-property
        toc-overflow-auto
        scrollbar-color-[var(${resolveVar('thumb')})_var(${resolveVar('track')})]
        scrollbar-track:toc-bg-[var(${resolveVar('track')})]
        scrollbar-thumb:toc-bg-[var(${resolveVar('thumb')})]
        scrollbar:toc-w-[var(${resolveVar('width')})]
        scrollbar:toc-h-[var(${resolveVar('height')})]
      `,
    ],
    [
      'toc-scrollbar-rounded', `
        scrollbar-track:toc-rounded-[var(${resolveVar('track-radius')})]
        scrollbar-thumb:toc-rounded-[var(${resolveVar('thumb-radius')})]
      `,
    ],
  ],
  transformers: [
    transformerDirectives(),
  ],
})
