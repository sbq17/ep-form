/**
 * el组件渲染的插槽配置
 */

// import { CustomFormItem, FormItemRenderComponentType } from './type'

/**
 * el input slot插槽
 */
export const InputSlot = ['prefix', 'suffix', 'prepend', 'append'] as const
/**
 * el select slot插槽
 */
export const SelectSlot = ['default', 'header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'] as const
/**
 * el number picker slot插槽
 */
export const NumberSlot = ['decrease-icon', 'increase-icon'] as const
/**
 * el date picker slot插槽
 */
export const DateSlot = ['default', 'range-separator', 'prev-month', 'next-month', 'prev-year', 'next-year'] as const

/**
 * el form item slot插槽
 */
export const FormItemSlot = ['label', 'error']

/**
 * 组件渲染支持的插槽类型前缀
 */
// export const FormItemRenderType: FormItemRenderComponentType[] = ['input', 'select', 'date', 'number'] as const

// declare type SlotEnumType = {
// 	input: typeof InputSlot
// 	select: typeof SelectSlot
// 	date: typeof DateSlot
// 	number: typeof NumberSlot
// }

// type DefaultDataType = Record<string, any>
// type DataType = { a: string; b: string }

// export declare type SlotTypeTrans<
// 	DataType extends DefaultDataType = DefaultDataType,
// 	K extends keyof DataType = keyof DataType,
//   ST extends keyof SlotEnumType = keyof SlotEnumType
// > = {
// 	[SlotName in SlotEnumType[ST][number] as `${K}-${ST}-${SlotName}`]: (...args) => ReturnNodeType
// }

// const dwa :SlotTypeTrans<DataType> = {

// }

// const columnsItem: Columns<DataType> = {
//   prop: 'a',
//   renderType: 'input'
// }

// 我希望有这样一个类型 SlotTypeTrans

// 当我定义配置columnsItem时，提取SlotEnumType中的input代表的slot类型
// SlotTypeTrans推导出的 slot 类型 应该输出 `${prop}-${renderType}-'prefix'|'suffix'| 'prepend'|'append'`

// 有这样的参数
// export const FormItemRenderType: FormItemRenderComponentType[] = ['input', 'select', 'date', 'number'] as const
// 有一个这样的类型

// 数据类型
// type DataType = {a:string, b:string}

// export declare type SlotTypeTrans<
// 	SlotType extends readonly string[],
// 	DataType extends DefaultDataType = DefaultDataType,
// 	K extends keyof DataType = keyof DataType,
// > = {
// 	[Item in SlotType[number] as `${K}-render-${Item}`]: (...args) => ReturnNodeType
// }
