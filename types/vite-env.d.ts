/// <reference types="vite/client" />
declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const component: DefineComponent<Record<string, any>, Record<string, any>, Record<string, any>>
	export default component
}

