/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElDatePicker, ElInput, ElInputNumber, ElSelect, ElTimePicker } from 'element-plus'
import { ComponentEmitType, DefaultDataType, EpItemProps, ShowColumnItem, SlotType } from './type'
import { createTextVNode, SetupContext, VNode } from 'vue'
import { DateSlot, InputSlot, NumberSlot, SelectSlot } from './slots'

const filterSlot = (prop: string, renderType: ShowColumnItem['renderType'], slots: SetupContext['slots']) => {
	const componentSlotMap: Partial<Record<ShowColumnItem['renderType'], readonly string[]>> = {
		input: InputSlot,
		select: SelectSlot,
		number: NumberSlot,
		date: DateSlot
	}

	const slotList = componentSlotMap[renderType] || []

	const result = slotList.reduce<Record<string, any>>((_slots, key) => {
		const name = `${prop}-${renderType}-${key}`
		const render = slots[name]
		if (render) {
			_slots[key] = render
		}
		return _slots
	}, {})

	return result
}

export default defineComponent(
	<DataType extends DefaultDataType = DefaultDataType>(props: EpItemProps<DataType>, ctx: SetupContext<any>) => {
		console.log(props, ctx)

		return () => '12312'
	},
	{
		name: 'EpFormItem'
	}
)

export const renderItem = <DataType extends DefaultDataType>(
	formData: Partial<DefaultDataType>,
	item: ShowColumnItem<DataType>,
	emits: SetupContext<ComponentEmitType>['emit'],
	slots: SetupContext['slots']
) => {
	console.log(emits)

	let renderNode: VNode | undefined = undefined

	const { prop, renderType } = item

	// 自定义渲染插槽
	const _slots = filterSlot(prop as string, renderType, slots)

	switch (item.renderType) {
		case 'input':
			renderNode = h(
				ElInput,
				{
					onChange: (v) => {
						console.log(v)
					},
					onInput: (v) => {
						console.log(v)
					}
				},
				{ ..._slots }
			)
			break

		case 'number':
			renderNode = h(ElInputNumber, {})
			break

		case 'select':
			renderNode = h(ElSelect, {})
			break

		case 'date':
			renderNode = h(ElDatePicker, {})
			break

		case 'time':
			renderNode = h(ElTimePicker, {})
			break

		case 'text':
			renderNode = createTextVNode(formData[item.prop as any])
			break

		case 'slot':
			break

		case 'format':
			break

		default:
			renderNode = createTextVNode('未定义renderType，无法渲染组件')
			break
	}

	return renderNode
}
