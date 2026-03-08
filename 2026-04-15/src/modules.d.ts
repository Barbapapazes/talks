declare module 'virtual:vite-file-system:*' {
  export default string
}

declare module 'virtual:vite-transformed-file:*' {
  export default string
}

declare module 'virtual:growth-chart' {
  export const vite: Array<[string, number]>
  export const webpack: Array<[string, number]>
  export const rspack: Array<[string, number]>
  export const isString: Array<[string, number]>
}
