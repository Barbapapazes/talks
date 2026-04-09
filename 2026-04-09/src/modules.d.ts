declare module 'virtual:vite-file-system:*' {
  export default string
}

declare module 'virtual:vite-transformed-file:*' {
  export default string
}

declare module 'virtual:vite-build:*' {
  export default string
}

declare module 'virtual:growth-chart' {
  export const months: Array<string>
  export const series: Array<{
    id: string
    packageName: string
    data: Array<[string, number]>
  }>
}
