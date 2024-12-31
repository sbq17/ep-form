/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * emit事件
 */
export type EpItemEmitParams<DataType extends DefaultDataType, EventType = any> = {
	prop: keyof DataType
	renderType: FormItemRenderComponentType
	value?: any
	event?: EventType
}

export declare type EmitType<DataType extends DefaultDataType> = {
	// 'update:modelValue': [formData: DataType]
	// epInput: [params: EpItemEmitParams<DataType, any>]
	// epChange: [params: EpItemEmitParams<DataType, any>]
	// epBlur: [params: EpItemEmitParams<DataType, FocusEvent>]
	// epFocus: [params: EpItemEmitParams<DataType, FocusEvent>]
	// epClear: [params: EpItemEmitParams<DataType, any>]
	(e: 'update:modelValue', formData: DataType): void
	(e: 'epInput', params: EpItemEmitParams<DataType, any>): void
	(e: 'epChange', params: EpItemEmitParams<DataType, any>): void
	(e: 'epBlur', params: EpItemEmitParams<DataType, FocusEvent>): void
	(e: 'epFocus', params: EpItemEmitParams<DataType, FocusEvent>): void
	(e: 'epClear', params: EpItemEmitParams<DataType, any>): void
}

export declare type EpItemEmitType<DataType extends DefaultDataType> = {
	itemInput: [params: EpItemEmitParams<DataType, any>]
	itemChange: [params: EpItemEmitParams<DataType, any>]
	itemBlur: [params: EpItemEmitParams<DataType, FocusEvent>]
	itemFocus: [params: EpItemEmitParams<DataType, FocusEvent>]
	itemClear: [params: EpItemEmitParams<DataType, any>]
}
