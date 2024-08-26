import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		vue(),
		dts({
			// 配置选项
			outDir: 'dist/types', // 指定输出类型文件的目录
			rollupTypes: true, // 将所有类型合并为一个文件
			exclude: ['src/main.ts'] // 排除不需要生成类型的文件
		}),
		AutoImport({
			imports: ['vue'],
			ignore: ['h'],
			resolvers: [ElementPlusResolver()],
			dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
		})
	],
	build: {
		lib: {
			entry: './lib/main.ts',
			name: 'element-plus-form',
			fileName: 'index',
			formats: ['es', 'umd']
		},
		rollupOptions: {
			// 确保外部依赖不被打包
			external: ['vue', 'element-plus'], // 将 Vue 视为外部依赖
			output: {
				globals: {
					vue: 'Vue', // UMD 格式下的全局变量名
					'element-plus': 'ElementPlus'
				}
			}
		}
	}
})

