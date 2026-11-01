/* eslint-disable */
// @ts-nocheck
import _export_sfc from '/@id/__x00__plugin-vue:export-helper'; import { createHotContext as __vite__createHotContext } from '/@vite/client'
import { createElementBlock as _createElementBlock, defineComponent as _defineComponent, openBlock as _openBlock, toDisplayString as _toDisplayString, ref } from '/node_modules/.vite/deps/vue.js?v=ed2c93c8'

import.meta.hot = __vite__createHotContext('/src/App.vue')
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: 'App',
  setup(__props, { expose: __expose }) {
    __expose()
    const world = ref('World')
    const __returned__ = { world }
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    })
    return __returned__
  },
})
 
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
   
  return _openBlock(), _createElementBlock(
    'div',
    null,
    ` Hello ${_toDisplayString($setup.world)}! `,
    1,
    /* TEXT */
  )
}
_sfc_main.__hmrId = '7a7a37b1'
typeof __VUE_HMR_RUNTIME__ !== 'undefined' && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)
import.meta.hot.on('file-changed', ({ file }) => {
  __VUE_HMR_RUNTIME__.CHANGED_FILE = file
})
import.meta.hot.accept((mod) => {
  if (!mod)
    return
  const { default: updated, _rerender_only } = mod
  if (_rerender_only) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)
  }
  else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)
  }
})

export default /* @__PURE__ */ _export_sfc(_sfc_main, [['render', _sfc_render], ['__file', '/Users/vite-project/src/App.vue']])
