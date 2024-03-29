/// <reference types="vite/client" />
declare module '~build/meta' {
  export const message: string
}

// declare module "*.svg?component" {
//   import { DefineComponent } from 'vue';
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

declare module '~build/time' {
  const now: string
  export default now
}

declare module '~build/info' {
  export const CI: any
  export const github: any
  export const sha: string
  export const abbreviatedSha: string
  export const tag: string
  export const lastTag: string
  export const commitsSinceLastTag: string
  export const committer: string
  export const committerDate: string
  export const author: string
  export const authorDate: string
  export const commitMessage: string
}

declare namespace CSS {
  interface PropertyDefinition {
    name: string
    syntax?: string
    inherits: boolean
    initialValue?: string
  }
  function registerProperty(propertyDefinition: PropertyDefinition): undefined
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
