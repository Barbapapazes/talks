declare module 'virtual:vite-file-system:*' {
  const code: string
  export default code
}

declare module 'virtual:vite-transformed-file:*' {
  const code: string
  export default code
}

declare module 'virtual:vite-build:*' {
  const code: string
  export default code
}

declare module 'virtual:growth-chart' {
  export const months: Array<string>
  export const series: Array<{
    id: string
    packageName: string
    data: Array<[string, number]>
  }>
}
