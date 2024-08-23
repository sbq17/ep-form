import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	{
		languageOptions: { globals: globals.browser },
		plugins: {
			prettier: pluginPrettier // 添加 Prettier 插件
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } }
	},
	{
		ignores: ['dist/**/*', 'node_modules/**/*']
	},
	{
		// 添加 Prettier 配置
		files: ['**/*.{js,ts,vue}'],
		rules: {
			// "prettier/prettier": "error", // 将 Prettier 规则作为 ESLint 规则
		}
	},
	prettier // 确保将 Prettier 配置放在最后
]

