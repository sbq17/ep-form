import type {
	DateItemProps,
	DefaultDataType,
	ErrorMsg,
	FormItemRenderComponentType,
	InputItemProps,
	LabelMsg,
	NumberItemProps,
	ReturnNodeType,
	SelectItemProps
} from '.'

export declare type InputSlot = readonly ['prefix', 'suffix', 'prepend', 'append']
export declare type DateSlot = readonly [
	'default',
	'range-separator',
	'prev-month',
	'next-month',
	'prev-year',
	'next-year'
]
export declare type NumberSlot = readonly ['decrease-icon', 'increase-icon']
export declare type SelectSlot = readonly ['default', 'header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label']

/**
 * 转换组件中的插槽集合来生成slot类型
 */
export declare type TransComponentSlot<SlotList extends Array> = {
	slot?: Partial<{
		[Name in SlotList[number] as `${Name}`]: (params: SlotParams<DataType, ColumnItem>) => ReturnNodeType
	}>
}

/**
 * 默认插槽类型
 */
export declare type DefaultSlotType = {
	slot?: Partial<{
		default: (params: SlotParams<DataType, ColumnItem>) => ReturnNodeType
	}>
}

/**
 * 插槽参数
 */
declare type SlotParams<DataType, ColumnItem> = {
	/**
	 * 表单数据
	 */
	formData: DataType
	/**
	 * 表单配置
	 */
	itemConfig: ColumnItem
}

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
		params: SlotParams<DataType, ColumnItem>
	) => ReturnNodeType
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
	SlotTypeTrans<DateSlot, 'date', DataType, DateItemProps<DataType>> &
	SlotTypeTrans<NumberSlot, 'number', DataType, NumberItemProps<DataType>> &
	SlotTypeTrans<SelectSlot, 'select', DataType, SelectItemProps<DataType>> &
	SlotFormItemError<DataType> &
	SlotFormItemLabel<DataType>
// SlotFormItemType<DataType>
