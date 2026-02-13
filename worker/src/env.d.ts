// Augment the generated Env interface with additional environment variables
declare module 'cloudflare:workers' {
  interface Env {
    CF_API_TOKEN: string
  }
}

export {}
