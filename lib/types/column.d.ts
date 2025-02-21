import type { EpOptionGroup, EpOptionItem } from './element-plus'
import type {
	ColumnDateSlotType,
	ColumnSelectSlotType,
	DefaultSlotType,
	InputSlot,
	NumberSlot,
	SelectSlot,
	TransComponentSlot
} from './slot'
import type {
	CustomCssType,
	DefaultDataType,
	ErrorMsg,
	FnParams,
	FormItemRenderComponentType,
	LabelMsg,
	PickFormItem,
	ReturnNodeType
} from './variables'

import type {
	ColProps,
	FormItemProps,
	FormItemRule,
	InputProps,
	ISelectProps,
	DatePickerProps,
	TimePickerDefaultProps,
	InputNumberProps
} from 'element-plus'

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
	required?: FormItemProps['required']
	/**
	 * 渲染组件类型
	 */
	renderType: FormItemRenderComponentType
	/**
	 * formItem配置
	 */
	formItemProps?: Partial<PickFormItem>
}

/**
 * 显示columns属性
 */
export declare type ShowColumnItem<DataType = DefaultDataType> = Omit<
	CustomColumnItem<DataType>,
	'col'
> & {
	col: Partial<ColProps>
}

/**
 * 自定义formItem类型
 */
export declare type EpColumnItem<DataType extends DefaultDataType = DefaultDataType> =
	CustomColumnItem<DataType> extends { renderType: infer Type }
		? Type extends 'input'
			? InputItemProps<DataType> &
					FormatProps<InputItemProps<DataType>, DataType> &
					TransComponentSlot<InputSlot>
			: Type extends 'select'
				? SelectItemProps<DataType> &
						FormatProps<SelectItemProps<DataType>, DataType> &
						TransComponentSlot<SelectSlot>
				: Type extends 'date'
					? DateItemProps<DataType> & FormatProps<DateItemProps<DataType>, DataType>
					: Type extends 'time'
						? TimeItemProps<DataType> &
								FormatProps<TimeItemProps<DataType>, DataType> &
								DefaultSlotType
						: Type extends 'number'
							? NumberItemProps<DataType> &
									FormatProps<NumberItemProps<DataType>, DataType> &
									TransComponentSlot<NumberSlot>
							: Type extends 'text'
								? TextItemProps<DataType> &
										FormatProps<TextItemProps<DataType>, DataType> &
										DefaultSlotType
								: FormatItemProps<DataType> &
										FormatProps<FormatItemProps<DataType>, DataType> &
										DefaultSlotType
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
	/**
	 * select props
	 */
	selectProps?: Partial<
		Omit<ISelectProps, 'modelValue' | 'update:modelValue' | 'remoteMethod'> & CustomCssType
	> & {
		remoteMethod?: (params: {
			query: string
			// fuzzySearchMode: SelectItemProps<DataType>['fuzzySearchMode'],
			formData: Partial<DataType>
			itemConfig: Omit<
				SelectItemProps<DataType>,
				'groupOptions' | 'options' | 'slot' | 'renderType'
			>
			/**
			 * el-options 配置
			 */
			options?: EpOptionItem<DataType>[]
			/**
			 * el-options 分组配置
			 */
			groupOptions?: EpOptionGroup<DataType>[]
		}) =>
			| void
			| EpOptionItem<DataType>[]
			| EpOptionGroup<DataType>[]
			| Promise<void | EpOptionItem<DataType>[] | EpOptionGroup<DataType>[]>
	}
	/**
	 * 是否开启模糊搜索
	 */
	fuzzySearch?: boolean
	/**
	 * 模糊搜索匹配哪个字段
	 */
	fuzzySearchMode?: string[]
	/**
	 * options value 字段
	 */
	optionLabel?: string | ((params: FnParams<DataType, SelectItemProps<DataType>>) => string)
	/**
	 * options label 字段
	 */
	optionValue?: string | ((params: FnParams<DataType, SelectItemProps<DataType>>) => string)
	/**
	 * options key 字段
	 */
	optionKey?: string
	/**
	 * el-options 配置
	 */
	options?: EpOptionItem<DataType>[]
	/**
	 * el-options 分组配置
	 */
	groupOptions?: EpOptionGroup<DataType>[]
} & {
	slot?: Partial<ColumnSelectSlotType<DataType>>
}

/**
 * date column配置
 */
export declare type DateItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'date'
} & {
	dateProps?: Partial<Omit<DatePickerProps, 'modelValue' | 'update:modelValue'> & CustomCssType>
} & {
	slot?: Partial<ColumnDateSlotType<DataType>>
}

/**
 * time column配置
 */
export declare type TimeItemProps<DataType = DefaultDataType> = CustomColumnItem<DataType> & {
	renderType: 'time'
} & {
	timeProps?: Partial<
		Omit<TimePickerDefaultProps, 'modelValue' | 'update:modelValue'> & CustomCssType
	>
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
	renderType: 'render'
} & {
	renderProps?: Partial<CustomCssType>
}

/**
 * 格式化参数
 */
type FormatParams<ColumnType, DataType> = {
	/**
	 * 格式化列配置
	 */
	columns: ColumnType
	/**
	 * 表单数据
	 */
	formData: Partial<DataType>
}

/**
 * 自定义渲染配置
 */
declare type FormatProps<ColumnType, DataType> = {
	/**
	 * 格式化内容自定义渲染
	 * @param 表单配置
	 * @returns
	 */
	// format?: (params: FormatParams<ColumnType, DataType>) => ReturnNodeType | ReturnNodeType[]
	/**
	 * 自定义渲染
	 * @param 表单配置
	 * @returns
	 */
	render?: (params: FormatParams<ColumnType, DataType>) => ReturnNodeType | ReturnNodeType[]
}
