import config from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    presets: [
      presetWebFonts({
        fonts: {
          sans: 'Nunito',
          strong: 'Rubik Iso',
          fast: 'Ubuntu',
          hand: 'Caveat',
        },
      }),
    ],
    theme: {
      colors: {
        yellow: '#ECDC5A',
      },
    },
  },
])
