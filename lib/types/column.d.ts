import { ColProps, FormItemRule } from 'element-plus'
import { CustomCssType, DefaultDataType, FormItemRenderComponentType, ReturnNodeType } from './variables'

/**
 * 自定义的属性配置
 */
export declare type CustomColumnItem<DataType = DefaultDataType> = {
	/**
	 * 文本
	 */
	label: string
	/**
	 * 字段
	 */
	prop: keyof DataType
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
}

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
