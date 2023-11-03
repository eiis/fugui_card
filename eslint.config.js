// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // Without `files`, they are general rules for all files
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
