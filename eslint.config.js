import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,vue}'],
  },
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
]
