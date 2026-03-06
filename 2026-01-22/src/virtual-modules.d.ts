declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module 'virtual:ai:tell-me-more-about-inertia' {
  export const assistantHtmlFrames: string[]
  export const rawMarkdown: string
  export const tokenCount: number
}

declare module 'virtual:ai:inertia-alternatives' {
  export const assistantHtmlFrames: string[]
  export const rawMarkdown: string
  export const tokenCount: number
}

declare module 'virtual:ai:inertia-specificities' {
  export const assistantHtmlFrames: string[]
  export const rawMarkdown: string
  export const tokenCount: number
}

export {}
