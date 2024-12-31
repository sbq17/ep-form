/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CustomCssType, EpColumnItem, EpItemEmitParams } from '.'
import type { ColProps, ConfigProviderProps, RowProps, FormProps, FormItemRule } from 'element-plus'

/**
 * 表单规则
 */
export declare type EpRule<DataType> = Record<keyof DataType, FormItemRule[]>

/**
 * element-plus form组件属性
 */
export declare type EpFormProps<DataType> = Omit<FormProps, 'model' | 'rules'> &
	Partial<CustomCssType> & { rules?: EpRule<DataType> }

/**
 * 组件接收props
 */
export declare type Props<DataType> = {
	/**
	 * 表单组件
	 */
	modelValue?: DataType
	/**
	 * 显示的表单配置
	 */
	columns?: EpColumnItem<DataType>[]
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
	/**
	 * v-model更新表单数据
	 * @param data 表单数据
	 * @returns
	 */
	'onUpdate:modelValue'?: (data: DataType) => void
	/**
	 * epInput事件
	 * @param params 参数
	 * @returns
	 */
	onEpInput?: (params: EpItemEmitParams<DataType, any>) => void
	/**
	 * epChange事件
	 * @param params 参数
	 * @returns
	 */
	onEpChange?: (params: EpItemEmitParams<DataType, any>) => void
	/**
	 * epBlur事件
	 * @param params 参数
	 */
	onEpBlur?: (params: EpItemEmitParams<DataType, FocusEvent>) => void
	/**
	 * epFocus事件
	 * @param params 参数
	 * @returns
	 */
	onEpFocus?: (params: EpItemEmitParams<DataType, FocusEvent>) => void
	/**
	 * epClear事件
	 * @param params 参数
	 * @returns
	 */
	onEpClear?: (params: EpItemEmitParams<DataType, any>) => void
}

/**
 * 表单组件属性
 */
export declare type EpItemProps<DataType extends DefaultDataType = DefaultDataType> = {
	/**
	 * 定义的插槽
	 */
	defineSlots?: SlotType<DataType>
	/**
	 * 表单数据
	 */
	formData: Partial<DefaultDataType>
	/**
	 * 表达那配置
	 */
	itemConfig: CustomFormItem<DataType>
	/**
	 * item input 事件
	 * @param params 参数
	 * @returns
	 */
	onItemInput?: (params: EpItemEmitParams<DataType, any>) => void
	/**
	 * item change 事件
	 * @param params 参数
	 * @returns
	 */
	onItemChange?: (params: EpItemEmitParams<DataType, any>) => void
	/**
	 * item blur 事件
	 * @param params 参数
	 * @returns
	 */
	onItemBlur?: (params: EpItemEmitParams<DataType, FocusEvent>) => void
	/**
	 * item focus 事件
	 * @param params 参数
	 * @returns
	 */
	onItemFocus?: (params: EpItemEmitParams<DataType, FocusEvent>) => void
	/**
	 * item clear 事件
	 * @param params 参数
	 * @returns
	 */
	onItemClear?: (params: EpItemEmitParams<DataType, any>) => void
}
