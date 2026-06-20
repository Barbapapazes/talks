/* eslint-disable */
// @ts-nocheck
// jsx element
import { Item } from "/src/item.jsx";
var _jsxFileName = "/Users/esoub/dev/tmp/vite-project/src/main.jsx";
import __vite__cjsImport1_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b73b9a55"; const _jsxDEV = __vite__cjsImport1_react_jsxDevRuntime["jsxDEV"];
// use the jsx element
function App() {
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [
		/* @__PURE__ */ _jsxDEV("h1", { children: "My App" }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, this),
		/* @__PURE__ */ _jsxDEV(Item, {
      name: "Item 1",
      price: 10
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, this),
		/* @__PURE__ */ _jsxDEV(Item, {
      name: "Item 2",
      price: 20
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, this)
    ]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
// render the app
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=b73b9a55"; const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ _jsxDEV(App, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 18,
  columnNumber: 13
}, this));
