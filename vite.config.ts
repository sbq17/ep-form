import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		dts({
			rollupTypes: true, // 合并类型声明
			insertTypesEntry: true, // 在入口文件插入类型声明入口
			exclude: ['src/main.ts'] // 排除不需要的文件
		}),
		AutoImport({
			imports: ['vue'],
			// ignore: ['h'],
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
			name: 'ep-form',
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
	},
	server: {
		hmr: true,
		open: true
	}
})

