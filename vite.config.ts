import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	plugins: [
		vue(),
		// vueDevTools(),
		dts({
			rollupTypes: true,
			// tsconfigPath: './tsconfig.json',

			exclude: ['./src/**/*']
		}),
		AutoImport({
			imports: ['vue'],
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
			// external: ['vue', 'element-plus'], // 将 Vue 视为外部依赖
			external: ['vue'], // 将 Vue 视为外部依赖
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

