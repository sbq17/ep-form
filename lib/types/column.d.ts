import { ColProps, FormItemProps, FormItemRule } from 'element-plus'
import { CustomCssType, DefaultDataType, FormItemRenderComponentType, PickFormItem, ReturnNodeType } from './variables'

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
	 * 是否选中
	 */
	required: FormItemProps['required']
	/**
	 * 渲染组件类型
	 */
	renderType: FormItemRenderComponentType
	/**
	 * formItem配置
	 */
	formItemProps?: PickFormItem
}

/**
 * 显示columns属性
 */
export declare type ShowColumnItem<DataType = DefaultDataType> = Omit<CustomColumnItem<DataType>, 'col'> & {
	col: Partial<ColProps>
}

/**
 * 自定义formItem类型
 */
export declare type EpItemProp<DataType extends DefaultDataType = DefaultDataType> =
	CustomColumnItem<DataType> extends { renderType: infer Type }
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
		: CustomColumnItem<DataType>

/**
 * input column配置
 */
export declare type InputItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'input'
} & {
	inputProps?: Partial<Omit<InputProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * select column配置
 */
export declare type SelectItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'select'
} & {
	selectProps?: Partial<Omit<ISelectProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * date column配置
 */
export declare type DateItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'date'
} & {
	dateProps?: Partial<Omit<DatePickerProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * time column配置
 */
export declare type TimeItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'time'
} & {
	timeProps?: Partial<Omit<TimePickerDefaultProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * number column配置
 */
export declare type NumberItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'number'
} & {
	numberProps?: Partial<Omit<InputNumberProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
}

/**
 * text column配置
 */
export declare type TextItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'text'
} & {
	textProps?: Partial<CustomCssType>
}

/**
 * 自定义渲染 column配置
 */
export declare type FormatItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
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
