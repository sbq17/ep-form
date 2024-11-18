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
