import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	build: {
		lib: {
			entry: './lib/main.ts',
			name: 'Counter',
			fileName: 'counter'
		}
	}
})

