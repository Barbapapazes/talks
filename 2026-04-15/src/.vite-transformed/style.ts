import { createHotContext as __vite__createHotContext, removeStyle as __vite__removeStyle, updateStyle as __vite__updateStyle } from '/@vite/client'

import.meta.hot = __vite__createHotContext('/src/style.css')
const __vite__id = '/Users/vite-project/src/style.css'
const __vite__css = ':root {\n  font-family: \'Inter\', sans-serif;\n}\n'
__vite__updateStyle(__vite__id, __vite__css)
import.meta.hot.accept()
import.meta.hot.prune(() => __vite__removeStyle(__vite__id))
