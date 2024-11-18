/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormItemProps } from 'element-plus'

/**
 * 默认的数据格式
 */
export declare type DefaultDataType = Record<string, any>

/**
 * 自定义样式名称
 */
export declare type CustomCssType = {
	/**
	 * 类名
	 */
	class: string | string[]
	/**
	 * 行内样式
	 */
	style: CSSProperties
}

/**
 * 返回的节点样式
 */
export declare type ReturnNodeType = string | VNode

/**
 * 渲染组件类型
 */
export declare type FormItemRenderComponentType =
	| 'input'
	| 'select'
	| 'date'
	| 'number'
	| 'time'
	| 'text'
	| 'slot'
	| 'format'

/**
 * 讲TransType中的key用PRrefix拼接
 */
export declare type RenameCssType<Prefix extends string, TransType> = {
	[K in keyof TransType as `${Prefix}${Capitalize<K>}`]: CssType[K]
}

/**
 * 排除FormItem部分属性
 */
export declare type PickFormItem = Omit<FormItemProps, 'label' | 'prop' | 'rules' | 'required'> & CustomCssType
