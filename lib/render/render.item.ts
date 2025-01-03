/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetupContext, VNode } from 'vue'
import type {
	ShowColumnItem,
	DefaultDataType,
	EpItemProps,
	EpItemEmitType,
	EpColumnItem
} from '../types'
import { ElDatePicker, ElInput, ElInputNumber, ElSelect, ElTimePicker } from 'element-plus'
import { DateSlot, InputSlot, NumberSlot, SelectSlot } from '../constant'
import { createTextVNode } from 'vue'

/**
 * 通过 prop 和 renderType 获取指定插槽格式fn
 * @param prop 显示字段
 * @param renderType 组件渲染类型
 * @param slots 插槽名
 * @returns
 */
const filterSlot = <DataType extends DefaultDataType>(
	formData: Partial<DataType>,
	item: EpColumnItem<DataType>,
	slots: SetupContext['slots']
): SetupContext['slots'] => {
	const { prop, renderType } = item
	const customSlot = item.slot || {}

	/**
	 * 插槽映射map
	 */
	const componentSlotMap: Record<ShowColumnItem['renderType'], readonly string[]> = {
		input: InputSlot,
		select: SelectSlot,
		number: NumberSlot,
		date: DateSlot,
		render: ['default'],
		text: ['default'],
		time: []
	}

	/**
	 * 获取对应的插槽集合
	 */
	const slotList = componentSlotMap[renderType] || []

	/**
	 * 获取可以匹配到的插槽
	 */
	const result = slotList.reduce<Record<string, any>>((_slots, key) => {
		let _renderFn: any = undefined
		if (customSlot[key as keyof typeof customSlot]) {
			_renderFn = customSlot[key as keyof typeof customSlot]
		} else {
			const name = `${prop as string}-${renderType}-${key}`
			_renderFn = slots[name]
		}

		if (_renderFn) {
			_slots[key] = () => _renderFn({ formData: formData, itemConfig: item })
		}

		return _slots
	}, {})

	return result
}

const emitsFn = <DataType extends DefaultDataType>(
	item: EpColumnItem<DataType>,
	emits: SetupContext<EpItemEmitType<DataType>>['emit']
) => {
	return {
		emitBlur: (e: FocusEvent) =>
			emits('itemBlur', { prop: item.prop, renderType: item.renderType, event: e }),
		emitFocus: (e: FocusEvent) =>
			emits('itemFocus', { prop: item.prop, renderType: item.renderType, event: e }),
		emitChange: (value: any) =>
			emits('itemChange', { prop: item.prop, renderType: item.renderType, value }),
		emitInput: (value: any) =>
			emits('itemInput', { prop: item.prop, renderType: item.renderType, value }),
		emitClear: () => emits('itemClear', { prop: item.prop, renderType: item.renderType }),
		emitVisible: (value: boolean) =>
			emits('itemVisible', { prop: item.prop, renderType: item.renderType, visible: value })
		// emitSelect: (value: any) => emits('itemSelect', { prop: item.prop, renderType: item.renderType, value }),
		// emitReset: () => emits('itemReset', { prop: item.prop, renderType: item.renderType })
	}
}

/**
 * 渲染单个组件
 * @param formData 表单值
 * @param item 渲染配置
 * @param emits emit事件
 * @param slots 渲染插槽
 * @returns
 */
// const renderItem = <DataType extends DefaultDataType>(
// 	formData: Partial<DataType>,
// 	item: EpColumnItem<DataType>,
// 	emits: SetupContext<EpItemEmitType<DataType>>['emit'],
// 	slots: SetupContext['slots']
// ) => {
// 	let renderNode: VNode | undefined = undefined

// 	const { prop } = item

// 	// 自定义渲染插槽
// 	const _slots = filterSlot(formData, item, slots)

// 	const { emitBlur, emitChange, emitFocus, emitInput, emitClear, emitVisible } = emitsFn(
// 		item,
// 		emits
// 	)

// 	const modelValue = formData[prop]

// 	switch (item.renderType) {
// 		case 'input':
// 			renderNode = h(
// 				ElInput,
// 				{
// 					modelValue,
// 					...item.inputProps,
// 					onBlur: emitBlur,
// 					onFocus: emitFocus,
// 					onChange: emitChange,
// 					onInput: emitInput,
// 					onClear: emitClear
// 				},
// 				{ ..._slots }
// 			)
// 			break

// 		case 'date':
// 			renderNode = h(
// 				ElDatePicker,
// 				{
// 					modelValue,
// 					...item.dateProps,
// 					'onUpdate:modelValue': emitInput,
// 					onBlur: emitBlur,
// 					onFocus: emitFocus,
// 					onChange: emitInput,
// 					onClear: emitClear,
// 					onCalendarChange: emitChange,
// 					onVisibleChange: emitVisible
// 				},
// 				{ ..._slots }
// 			)
// 			break

// 		case 'select':
// 			renderNode = h(ElSelect, {})
// 			break

// 		case 'number':
// 			renderNode = h(ElInputNumber, {})
// 			break

// 		case 'time':
// 			renderNode = h(ElTimePicker, {})
// 			break

// 		case 'text':
// 			renderNode = createTextVNode(formData[item.prop as any])
// 			break

// 		default:
// 			renderNode = createTextVNode('未定义renderType，无法渲染组件')
// 			break
// 	}

// 	return renderNode
// }

/**
 * 渲染组件
 */
export default defineComponent(
	<DataType extends DefaultDataType = DefaultDataType>(
		props: EpItemProps<DataType>,
		ctx: SetupContext<EpItemEmitType<DataType>>
	) => {
		return () => {
			const { formData, itemConfig: item, defineSlots } = props
			const emits = ctx.emit

			let renderNode: VNode | undefined = undefined

			const { prop } = item

			// 自定义渲染插槽
			const _slots = filterSlot(formData, item, defineSlots)

			const { emitBlur, emitChange, emitFocus, emitInput, emitClear, emitVisible } = emitsFn(
				item,
				emits
			)

			const modelValue = formData[prop]

			/**
			 * 关闭popper，tooltip的标识
			 */
			const persistent = false

			// return renderItem(props.formData, props.itemConfig, ctx.emit, props.defineSlots)
			switch (item.renderType) {
				case 'input':
					renderNode = h(
						ElInput,
						{
							modelValue,
							...item.inputProps,
							onBlur: emitBlur,
							onFocus: emitFocus,
							onChange: emitChange,
							onInput: emitInput,
							onClear: emitClear
						},
						{ ..._slots }
					)
					break

				case 'date':
					renderNode = h(
						ElDatePicker,
						{
							modelValue,
							...item.dateProps,
							'onUpdate:modelValue': emitInput,
							onBlur: emitBlur,
							onFocus: emitFocus,
							onChange: emitInput,
							onClear: emitClear,
							onCalendarChange: emitChange,
							onVisibleChange: emitVisible,
							/**
							 * 透传 属性 销毁popper dom
							 */
							persistent
						},
						{ ..._slots }
					)
					break

				case 'select':
					renderNode = h(ElSelect, {
						/**
						 * 透传 属性 销毁popper dom
						 */
						persistent
					})
					break

				case 'number':
					renderNode = h(ElInputNumber, {})
					break

				case 'time':
					renderNode = h(ElTimePicker, {})
					break

				case 'text':
					renderNode = createTextVNode(formData[item.prop as any])
					break

				default:
					renderNode = createTextVNode('未定义renderType，无法渲染组件')
					break
			}

			return renderNode
		}
	},
	{
		name: 'EpFormItem',
		props: {
			defineSlots: {
				type: Object,
				default: () => ({})
			},
			formData: {
				type: Object,
				default: () => ({})
			},
			itemConfig: {
				type: Object,
				default: () => ({})
			}
		},
		emits: ['itemInput', 'itemChange', 'itemBlur', 'itemFocus', 'itemClear', 'itemVisible']
	}
)
