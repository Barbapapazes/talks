/* eslint-disable */
// @ts-nocheck
import { createHotContext as __vite__createHotContext } from "/@vite/client"; import.meta.hot = __vite__createHotContext("/src/App.vue"); import { defineComponent as _defineComponent } from "/node_modules/.vite/deps/vue.js?v=68524f59"
import { ref, computed, effect } from "/node_modules/.vite/deps/vue.js?v=68524f59"
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "App",
  setup(__props, { expose: __expose }) {
    __expose()
    const count = ref(0)
    const double = computed(() => count.value * 2)
    effect(() => {
      console.log(`Count: ${count.value}, Double: ${double.value}`)
    })
    const __returned__ = {
      count,
      double,
      ref,
      computed,
      effect
    }
    Object.defineProperty(__returned__, "__isScriptSetup", {
      enumerable: false,
      value: true
    })
    return __returned__
  }
})
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "/node_modules/.vite/deps/vue.js?v=68524f59"
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("div", null, [
    _createElementVNode(
      "p",
      null,
      "Count: " + _toDisplayString($setup.count),
      1
      /* TEXT */
    ),
    _createElementVNode(
      "p",
      null,
      "Double: " + _toDisplayString($setup.double),
      1
      /* TEXT */
    ),
    _createElementVNode("button", { onClick: _cache[0] || (_cache[0] = ($event) => $setup.count++) }, "Increment")
  ])
}
_sfc_main.__hmrId = "7a7a37b1"
typeof __VUE_HMR_RUNTIME__ !== "undefined" && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)
import.meta.hot.on("file-changed", ({ file }) => {
  __VUE_HMR_RUNTIME__.CHANGED_FILE = file
})
export const _rerender_only = __VUE_HMR_RUNTIME__.CHANGED_FILE === "/home/esteban/dev/tmp/vite-vue/src/App.vue"
import.meta.hot.accept((mod) => {
  if (!mod) return
  const { default: updated, _rerender_only } = mod
  if (_rerender_only) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)
  } else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)
  }
})
import _export_sfc from "/@id/__x00__plugin-vue:export-helper"
export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/esteban/dev/tmp/vite-vue/src/App.vue"]])
