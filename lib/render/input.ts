import type { SetupContext } from 'vue'
import type { DefaultDataType, FormatProps, InputItemProps } from '../types'
import { ElInput } from 'element-plus'

declare type Props = {
	/**
	 * 表单值
	 */
	formData: DefaultDataType
	/**
	 * 配置项
	 */
	itemConfig: InputItemProps<DefaultDataType> & FormatProps<DefaultDataType, InputItemProps<DefaultDataType>>
}

declare type EmitType = {
	onBlur: [e: FocusEvent]
	onFocus: [e: FocusEvent]
	onChange: [v: string | number]
	onInput: [v: string | number]
	onClear: []
}

export default function dwadawdwa(props: Props, ctx: SetupContext<EmitType>) {
	console.log(props, ctx)

	const { formData, itemConfig } = props
	const { prop, render, inputProps } = itemConfig

	return render
		? render({ columns: itemConfig, formData: formData })
		: h(
				ElInput,
				{
					modelValue: (formData || {})[prop],
					...inputProps,
					onBlur: (e: FocusEvent) => {
						console.log(111)

						ctx.emit('onBlur', e)
					},
					onFocus: (e: FocusEvent) => {
						ctx.emit('onFocus', e)
					},
					onChange: (v: string | number) => {
						ctx.emit('onChange', v)
					},
					onInput: (v: string | number) => {
						console.log(v)
						ctx.emit('onInput', v)
					},
					onClear: () => {
						ctx.emit('onClear')
					}
				},
				{ ...ctx.slots }
			)
}

dwadawdwa.props = ['itemConfig', 'formData', 'onBlur', 'onFocus', 'onChange', 'onInput', 'onClear']
dwadawdwa.emits = [
	'onBlur',
	'onFocus',
	'onChange',
	'onInput',
	'onClear',
	// 'mouseenter',
	// 'mouseleave',
	'blur',
	'focus',
	'change',
	'input',
	'clear'
]
