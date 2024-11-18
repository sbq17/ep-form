/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	ColProps,
	ConfigProviderProps,
	RowProps,
	FormItemProps,
	FormItemContext,
	FormProps,
	FormContext,
	FormItemRule,
	InputProps,
	ISelectProps,
	DatePickerProps,
	TimePickerDefaultProps,
	InputNumberProps
} from 'element-plus'
import type { CSSProperties, UnwrapRef, VNode, VNodeRef } from 'vue'
import type { DateSlot, InputSlot, NumberSlot, SelectSlot } from './slots'

declare type DefaultDataType = Record<string, any>
// declare type DefaultDataType = FormProps['model']

/**
 * 自定义样式名称
 */
export declare type CustomCssType = { class: string | string[]; style: CSSProperties }

/**
 * 返回的节点样式
 */
export declare type ReturnNodeType = string | VNode

/**
 * 错误消息类型
 */
export declare type ErrorMsg = { error: string }

/**
 * form item label属性
 */
export declare type LabelMsg = { label: string }

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
 * 默认的columns配置
 */
export declare type DefaultCustomColumns<DataType extends DefaultDataType = DefaultDataType> = {
	/**
	 * 文本
	 */
	label: string
	/**
	 * 字段
	 */
	prop: keyof UnwrapRef<Partial<DataType>>
	// prop: keyof Partial<DataType>
	/**
	 * 是否显示
	 */
	show?: boolean
	/**
	 * 表单显示顺序，排序
	 */
	order?: number
	/**
	 * 表单项列占位
	 */
	col?: number | string | Partial<ColProps & CustomCssType>
	/**
	 * formItem label渲染插槽
	 * @returns
	 */
	labelRender?: ({ labelInfo }: { labelInfo: LabelMsg }) => ReturnNodeType
	/**
	 * formItem error插槽
	 * @returns
	 */
	errorRender?: ({ errorInfo }: { errorInfo: ErrorMsg }) => ReturnNodeType
	/**
	 * 规则重新定义
	 */
	rules?: FormItemRule[]
	/**
	 *
	 */
	renderType: FormItemRenderComponentType
} & Partial<Omit<FormItemProps, 'label' | 'prop' | 'rules'> & CustomCssType>

/**
 * 自定义formItem类型
 */
export declare type CustomFormItem<DataType extends DefaultDataType = DefaultDataType> =
	DefaultCustomColumns<DataType> extends { renderType: infer Type }
		? Type extends 'input'
			? InputItemProps<DataType> & FormatProps<InputItemProps<DataType>>
			: Type extends 'select'
				? SelectItemProps<DataType> & FormatProps<SelectItemProps<DataType>>
				: Type extends 'date'
					? DateItemProps<DataType> & FormatProps<DateItemProps<DataType>>
					: Type extends 'time'
						? TimeItemProps<DataType> & FormatProps<TimeItemProps<DataType>>
						: Type extends 'number'
							? NumberItemProps<DataType> & FormatProps<NumberItemProps<DataType>>
							: Type extends 'text'
								? TextItemProps<DataType> & FormatProps<TextItemProps<DataType>>
								: FormatItemProps<DataType> & FormatProps<FormatItemProps<DataType>>
		: DefaultCustomColumns<DataType>

/**
 * 显示columns属性
 */
export declare type ShowColumnItem<DataType = DefaultDataType> = Omit<CustomFormItem<DataType>, 'col'> & {
	col: Partial<ColProps>
}

/**
 * elForm属性props
 */
export declare type EpFormProps = Omit<FormProps, 'model' | 'rules'> &
	CustomCssType & { rules?: Record<string, FormItemRule[]> }

/**
 * 组件接收props
 */
export declare type Props<DataType = DefaultDataType> = {
	/**
	 * 表单组件
	 */
	modelValue?: UnwrapRef<Partial<DataType>>
	/**
	 * 显示的表单配置
	 */
	columns?: CustomFormItem<DataType>[]
	/**
	 * ElConfigProvider属性
	 */
	configProviderProps?: Partial<ConfigProviderProps>
	/**
	 * elForm表单配置props
	 */
	formProps?: Partial<EpFormProps>
	/**
	 * 列配置
	 */
	rowProps?: Partial<RowProps & CustomCssType>
	/**
	 * 行默认配置
	 */
	colProps?: Partial<ColProps & CustomCssType>
	'update:modelValue'?: (data: DataType) => void
}

/**
 * emit事件
 */
export declare type EmitType = {
	'update:modelValue': [formData: any]
}

/**
 * 组件Emit类型
 */
export declare type ComponentEmitType = {
	valueInput: [v: any, prop: string]
}

export declare type SlotTypeTrans<
	SlotType extends readonly string[],
	DataType extends DefaultDataType = DefaultDataType,
	K extends keyof DataType = keyof DataType
> = {
	[SlotName in SlotType[number] as `${K}-render-${SlotName}`]: (...args) => ReturnNodeType
}

export declare type SlotFormItemType<DataType extends DefaultDataType> = DataType extends { prop: infer P }
	? P extends string
		? {
				[SlotName in ['error-item' | 'label-item'][number] as `${p}-${SlotName}`]: (...args) => ReturnNodeType
			}
		: never
	: never

export declare type SlotType<DataType extends DefaultDataType> = SlotTypeTrans<typeof InputSlot, DataType> &
	SlotTypeTrans<typeof DateSlot, DataType> &
	SlotTypeTrans<typeof NumberSlot, DataType> &
	SlotTypeTrans<typeof SelectSlot, DataType> &
	SlotFormItemType<DataType>

/**
 * 提取formItem组件methods
 */
export declare type PickFormItemExpose =
	| Pick<FormItemContext, 'size' | 'validateMessage' | 'validateState' | 'validate' | 'resetField' | 'clearValidate'>
	| VNodeRef

/**
 * 提取columns中字段prop组合的formItem方法属性
 */
export declare type FormItemRef<DataType = DefaultDataType> = {
	[K in keyof DataType as `${K}FormItemRef`]: PickFormItemExpose
}

/**
 * 自定义表单导出
 */
export declare type EpFormExpose<DataType extends DefaultDataType = DefaultDataType> = {
	formItemRef: FormItemRef<DataType>
}

/**
 * elForm表单expose
 */
export declare type EpFormDefaultExpose = Pick<
	FormContext,
	'validate' | 'validateField' | 'resetFields' | 'scrollToField' | 'clearValidate' | 'fields '
>

/**
 * input column配置
 */
export declare type InputItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'input'
} & {
	inputProps?: Partial<Omit<InputProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * select column配置
 */
export declare type SelectItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'select'
} & {
	selectProps?: Partial<Omit<ISelectProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * date column配置
 */
export declare type DateItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'date'
} & {
	dateProps?: Partial<Omit<DatePickerProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * time column配置
 */
export declare type TimeItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'time'
} & {
	timeProps?: Partial<Omit<TimePickerDefaultProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * number column配置
 */
export declare type NumberItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'number'
} & {
	numberProps?: Partial<Omit<InputNumberProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * text column配置
 */
export declare type TextItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'text'
} & {
	textProps?: Partial<CustomCssType>
}

/**
 * 自定义渲染 column配置
 */
export declare type FormatItemProps<DataType = DefaultDataType> = DefaultCustomColumns<DataType> & {
	renderType: 'slot' | 'format'
} & {
	slotProps?: Partial<CustomCssType>
}

/**
 * 自定义渲染配置
 */
declare type FormatProps<ColumnType> = {
	/**
	 * 格式化内容自定义渲染
	 * @param 表单配置
	 * @returns
	 */
	format?: ({ columns }: { columns: ColumnType }) => ReturnNodeType
	/**
	 * 自定义渲染
	 * @param 表单配置
	 * @returns
	 */
	render?: ({ columns }: { columns: ColumnType }) => ReturnNodeType
}

export declare type EpItemProps<DataType extends DefaultDataType = DefaultDataType> = {
	defineSlots?: SlotType<DataType>
	formData: Partial<DefaultDataType>
	itemConfig: CustomFormItem<DataType>
}
