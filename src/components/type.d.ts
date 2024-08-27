import {
	ColProps,
	ConfigProviderProps,
	RowProps,
	FormItemProps,
	FormItemContext,
	FormProps,
	FormContext
} from 'element-plus'
import { CSSProperties, UnwrapRef, VNode } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type DefaultDataType = Record<string, any>

declare type CustomCssType = { class: string | string[]; style: CSSProperties }

export declare type CustomFormItem<DataType = DefaultDataType> = {
	/**
	 * 文本
	 */
	label: string
	/**
	 * 字段
	 */
	prop: keyof UnwrapRef<Partial<DataType>>
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
	labelRender?: () => string | VNode[] | (string | VNode)[]
	/**
	 * formItem error插槽
	 * @returns
	 */
	errorRender?: () => string | VNode[] | (string | VNode)[]
} & Partial<Omit<FormItemProps, 'label' | 'prop'> & CustomCssType>

/**
 * 显示columns属性
 */
export declare type ShowColumnItem<DataType = DefaultDataType> = Omit<CustomFormItem<DataType>, 'col'> & {
	col: Partial<ColProps>
}

/**
 * elForm属性props
 */
export declare type EpFormProps = Omit<FormProps, 'model'> & CustomCssType

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

export declare type EmitType = {
	'update:modelValue': [id: any]
}

/**
 * 提取formItem组件methods
 */
export declare type PickFormItemExpose = Pick<
	FormItemContext,
	'size' | 'validateMessage' | 'validateState' | 'validate' | 'resetField' | 'clearValidate'
>

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
