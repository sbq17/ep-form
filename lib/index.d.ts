/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	ComponentOptionsMixin,
	ComponentPropsOptions,
	ComputedOptions,
	DefineComponent,
	MethodOptions,
	Slots
} from 'vue'
import {
	Props,
	CustomFormItem as EpColumnItem,
	ReturnNodeType as EpReturnNodeType,
	EpFormProps,
	EpFormExpose,
	FormatProps as EpFormatProps
} from './type'

type __VLS_WithTemplateSlots<T, S> = T & {
	new (): {
		$slots: S
	}
}

declare const _default: __VLS_WithTemplateSlots<
	DefineComponent<
		ComponentPropsOptions<Props>,
		Record<string, any>,
		Record<string, any>,
		ComputedOptions,
		MethodOptions,
		ComponentOptionsMixin,
		ComponentOptionsMixin,
		any[],
		any,
		// EmitEvents[],
		// EmitEvents,
		Props
	>,
	Readonly<Slots> & Slots
>

export { EpColumnItem, EpReturnNodeType, EpFormProps, EpFormExpose, EpFormatProps }

export default _default

