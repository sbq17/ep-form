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
			// 允许以 _ 开头的变量和参数
			'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
			// '@typescript-eslint/no-unused-vars': 'error',
			// 提示未导入的类型
			// '@typescript-eslint/explicit-module-boundary-types': 'warn',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					disallowTypeAnnotations: true,
					fixStyle: 'separate-type-imports',
					prefer: 'type-imports'
				}
			]
			// 强制使用 import type 并将类型导入与其他导入分开
			// '@typescript-eslint/consistent-type-imports': [
			// 	'error',
			// 	{
			// 		prefer: 'type-imports', // 强制使用 import type
			// 		fixStyle: 'separate-types-imports' // 将类型导入与其他导入分开
			// 	}
			// ]
			// '@typescript-eslint/consistent-type-imports': [
			// 	'error',
			// 	{
			// 		prefer: 'type-imports', // 强制使用 import type
			// 		fixStyle: 'separate-types-imports' // 将类型导入与其他导入分开
			// 	}
			// ]
			// "prettier/prettier": "error", // 将 Prettier 规则作为 ESLint 规则
		}
	},
	prettier // 确保将 Prettier 配置放在最后
]

