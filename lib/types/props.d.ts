import { ColProps, FormItemRule, FormProps, RowProps } from 'element-plus'
import { CustomCssType } from './variables'
import { EpItemProp } from './column'

export declare type EpFormProps = Omit<FormProps, 'model' | 'rules'> &
	CustomCssType & { rules?: Record<string, FormItemRule[]> }

/**
 * 组件接收props
 */
export declare type Props<DataType = DefaultDataType> = {
	/**
	 * 表单组件
	 */
	modelValue?: DataType
	/**
	 * 显示的表单配置
	 */
	columns?: EpItemProp<DataType>[]
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
