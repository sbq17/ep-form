import type { dayjs } from 'element-plus'
import type {
	DateItemProps,
	DefaultDataType,
	ErrorMsg,
	FnOtherParams,
	FnParams,
	FormItemRenderComponentType,
	InputItemProps,
	LabelMsg,
	NumberItemProps,
	ReturnNodeType,
	SelectItemProps
} from '.'

/**
 * slot类型转换
 * @template SlotType 生成slot集合
 * @template RenderType 键值
 * @template DataType 数据类型
 * @template ColumnItem 渲染配置
 */
export declare type SlotTypeTrans<
	SlotTypeList extends readonly string[],
	RenderType extends FormItemRenderComponentType = FormItemRenderComponentType,
	DataType extends DefaultDataType = DefaultDataType,
	ColumnItem
> = {
	[SlotName in SlotTypeList[number] as `${keyof DataType}-${RenderType}-${SlotName}`]: (
		params: FnParams<DataType, ColumnItem>
	) => ReturnNodeType
}

export declare type InputSlot = ['prefix', 'suffix', 'prepend', 'append']

/**
 * date组件插槽集合
 */
export declare type DateSlotList = [
	'default',
	'range-separator',
	'prev-month',
	'next-month',
	'prev-year',
	'next-year'
]

/**
 * date组件default插槽参数
 */
export declare type DateDefaultSlotParams = {
	column: number
	customClass?: string
	date: Date
	dayjs: typeof dayjs
	disabled?: boolean
	end: boolean
	inRange: boolean
	isCurrent: boolean
	isSelected: boolean
	row: number
	selected?: DateDefaultSlotParams['dayjs'][]
	start: boolean
	text: number
	timestamp: number
	type: 'prev-month' | 'next-month' | 'normal' | 'today'
}

/**
 * 列配置中 date 插槽集合
 */
export type ColumnDateSlotType<DataType> = {
	[K in DateSlotList[number]]: K extends 'default'
		? (
				params: FnOtherParams<DataType, DateItemProps<DataType>, DateDefaultSlotParams>
			) => ReturnNodeType
		: (params: FnParams<DataType, DateItemProps<DataType>>) => ReturnNodeType
}

/**
 * slot插槽中 date 插槽参数
 */
export type SlotDateType<DataType = DefaultDataType> = {
	[SlotName in keyof ColumnDateSlotType<DataType> as `${keyof DataType}-date-${SlotName}`]: ColumnDateSlotType<DataType>[SlotName]
}

export declare type SelectSlot = [
	'option-default',
	'option-group-default',
	'header',
	'footer',
	'prefix',
	'empty',
	'tag',
	'loading',
	'label'
]

/**
 * select label 插槽参数
 */
export declare type SelectLabelSlotParams = { key?: number; label: string; value: string }

/**
 * 列配置中 select 插槽集合
 */
export type ColumnSelectSlotType<DataType> = {
	[K in SelectSlot[number]]: K extends 'label'
		? (
				params: FnOtherParams<DataType, SelectItemProps<DataType>, SelectLabelSlotParams>
			) => ReturnNodeType
		: K extends 'option-default'
			? (
					params: FnOtherParams<DataType, SelectItemProps<DataType>, EpOptionItem<DataType>>
				) => ReturnNodeType
			: K extends 'option-group-default'
				? (
						params: FnOtherParams<DataType, SelectItemProps<DataType>, EpOptionGroup<DataType>>
					) => ReturnNodeType
				: (params: FnParams<DataType, SelectItemProps<DataType>>) => ReturnNodeType
}

/**
 * slot插槽中 select 插槽参数
 */
export type SlotSelectType<DataType = DefaultDataType> = {
	[SlotName in keyof ColumnSelectSlotType<DataType> as `${keyof DataType}-select-${SlotName}`]: ColumnSelectSlotType<DataType>[SlotName]
}

export declare type NumberSlot = ['decrease-icon', 'increase-icon']

/**
 * 转换组件中的插槽集合来生成slot类型
 */
export declare type TransComponentSlot<SlotList extends Array> = {
	slot?: Partial<{
		[Name in SlotList[number] as `${Name}`]: (
			params: FnParams<DataType, ColumnItem>
		) => ReturnNodeType
	}>
}

/**
 * 默认插槽类型
 */
export declare type DefaultSlotType = {
	slot?: Partial<{
		default: (params: FnParams<DataType, ColumnItem>) => ReturnNodeType
	}>
}

/**
 * 定义formItem中slot名称
 * @template DataType 数据类型
 * @template K 键值
 */
// export declare type SlotFormItemType<DataType extends DefaultDataType, K extends keyof DataType = keyof DataType> = {
// 	[SlotName in ['error-item' | 'label-item'][number] as `${K}-${SlotName}`]: (params: any) => ReturnNodeType
// }

declare type SlotFormItemError<DataType extends DefaultDataType> = {
	[K in keyof DataType as `${K}-error-item`]: ({ msg }: { msg: ErrorMsg }) => ReturnNodeType
}

declare type SlotFormItemLabel<DataType extends DefaultDataType> = {
	[K in keyof DataType as `${K}-error-item`]: ({ msg }: { msg: LabelMsg }) => ReturnNodeType
}

/**
 * 生成slot集合
 * @template DataType 数据类型
 * @template K 键值
 */
export declare type SlotType<DataType extends DefaultDataType = DefaultDataType> = SlotTypeTrans<
	InputSlot,
	'input',
	DataType,
	InputItemProps<DataType>
> &
	SlotDateType<DataType> &
	SlotSelectType<DataType> &
	// SlotTypeTrans<DateSlotList, 'date', DataType, DateItemProps<DataType>> &
	// SlotTypeTrans<SelectSlot, 'select', DataType, SelectItemProps<DataType>> &
	SlotTypeTrans<NumberSlot, 'number', DataType, NumberItemProps<DataType>> &
	SlotFormItemError<DataType> &
	SlotFormItemLabel<DataType>
// SlotFormItemType<DataType>
