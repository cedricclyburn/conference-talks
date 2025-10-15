import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
// @ts-expect-error - Ignoring the error of missing types for the uno config
import config from '@slidev/client/uno.config'
// @ts-expect-error - Types for unocss may be unavailable in this environment
import { mergeConfigs, presetAttributify, presetIcons, presetWebFonts, presetWind3 } from 'unocss'

export default mergeConfigs([
  config,
  {
    rules: [
      ['font-math', { 'font-family': 'Latin Modern Roman, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }],
    ],
    safelist: [
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
      'animate-pulse',
    ],
    presets: [
      presetWind3({
        dark: 'class',
      }),
      presetAttributify(),
      presetIcons({
        prefix: 'i-',
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        warn: true,
        collections: {
          ...createExternalPackageIconLoader('@proj-airi/lobe-icons'),
        },
      }),
      presetWebFonts({
        fonts: {
          // Red Hat brand typography
          // Body text
          sans: 'Red Hat Text',
          // Headings / display
          display: 'Red Hat Display',
          // Monospace (for code samples)
          mono: 'Red Hat Mono',
          // Keep existing extras
          cn: 'Noto Serif SC',
          hand: 'Playwrite IT Moderna',
        },
      }),
    ],
  },
])
