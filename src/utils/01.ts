interface EnvironmentVars {
  NAME: string
  OS: string

  // Unknown properties are covered by this index signature.
  [propName: string]: string
}

declare const env: EnvironmentVars

// Declared as existing
const sysName = env.NAME
const os = env.OS

// const os: string

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV
