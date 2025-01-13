/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectItemProps } from './column'
import type { FnParams } from './variables'

export declare type EpOptionItem<DataType> = {
	/**
	 * 选项的值
	 */
	value?: any
	/**
	 * 选项的显示名称
	 */
	label?: string | number
	/**
	 * 是否禁用该选项
	 */
	disabled?: boolean | ((params: FnParams<DataType, SelectItemProps<DataType>>) => boolean)
} & Record<string, any>

export declare type EpOptionGroup<DataType> = {
	/**
	 * 分组的名称
	 */
	label?: string | number
	/**
	 * 是否将该分组下所有选项置为禁用
	 */
	disabled?: boolean | ((params: FnParams<DataType, SelectItemProps<DataType>>) => boolean)
	/**
	 * 选项列表
	 */
	options?: EpOptionItem<DataType>[]
} & Record<string, any>
