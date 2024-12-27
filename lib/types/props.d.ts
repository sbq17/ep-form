export declare type EpItem<T> = {
	prop: keyof T
	label: string
}

/**
 * 组件Props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type EpProps<T = any> = {
	modelValue?: T
	columns?: EpItem<T>[]
	'onUpdate:modelValue'?: (data: T) => void
}
