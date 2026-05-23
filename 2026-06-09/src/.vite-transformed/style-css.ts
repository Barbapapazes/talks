/* eslint-disable */
// @ts-nocheck
import { createHotContext as __vite__createHotContext } from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/style.css");
import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/@vite/client"
const __vite__id = "/home/esteban/dev/tmp/vite-hmr/src/style.css"
const __vite__css = ":root {  --primary-color: #3498db;  --secondary-color: #2ecc71;  --background-color: #f5f5f5;  --text-color: #333333;}"
__vite__updateStyle(__vite__id, __vite__css)
import.meta.hot.accept()
import.meta.hot.prune(() => __vite__removeStyle(__vite__id))
