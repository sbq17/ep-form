import type { VNodeRef } from 'vue'
import type { DefaultDataType } from '.'
import type { FormItemContext, FormContext } from 'element-plus'

/**
 * 自定义表单导出
 */
export declare type EpFormExpose<DataType extends DefaultDataType = DefaultDataType> = {
	/**
	 * 表单实例
	 */
	formRef: globalThis.Ref<EpFormDefaultExpose>
	/**
	 * 表单item实例
	 */
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
