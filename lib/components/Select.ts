/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import type {
	DefaultDataType,
	EpOptionGroup,
	EpOptionItem,
	SelectItemProps,
	SelectLabelSlotParams
} from '../types'

export default defineComponent({
	name: 'EpSelect',

	props: {
		itemConfig: { type: Object as PropType<SelectItemProps<DefaultDataType>>, default: () => ({}) },
		formData: { type: Object as PropType<DefaultDataType>, default: () => ({}) }
	},

	emits: ['change', 'visibleChange', 'removeTag', 'clear', 'blur', 'focus'],

	setup(props, { emit, slots }) {
		// const options = <SelectItemProps<DefaultDataType>['options']>([])

		const isGroup = computed(() => {
			const { groupOptions } = props.itemConfig!
			return Array.isArray(groupOptions) && groupOptions && groupOptions.length ? true : false
		})

		const fetchProps = (
			item: EpOptionGroup<DefaultDataType> | EpOptionItem<DefaultDataType>,
			isGroup: boolean
		) => {
			const { optionLabel, optionValue, optionKey } = props.itemConfig || {}

			const label = optionLabel
				? typeof optionLabel === 'function'
					? optionLabel({ formData: props.formData, itemConfig: props.itemConfig })
					: optionLabel
				: 'label'

			const disabled = item.disabled
				? typeof item.disabled === 'function'
					? item.disabled({ formData: props.formData, itemConfig: props.itemConfig })
					: item.disabled
				: false

			const key = optionKey ? item[optionKey] : (item[label] as string)

			if (isGroup) {
				return {
					key,
					label: item[label],
					disabled
				}
			} else {
				const valueKey = optionValue
					? typeof optionValue === 'function'
						? optionValue({ formData: props.formData, itemConfig: props.itemConfig })
						: optionValue
					: 'value'

				return {
					key,
					label: item[label] as string,
					value: item[valueKey] as string,
					disabled
				}
			}
		}

		const _renderOptions = (options: EpOptionItem<DefaultDataType>[]) => {
			return options.map((option) => {
				const optionProps = fetchProps(option, false) as any
				return h(
					ElOption,
					{ ...optionProps },
					{
						default: () =>
							slots['option-default']?.({
								formData: props.formData,
								itemConfig: props.itemConfig,
								params: option
							})
					}
				)
			})
		}

		const selectEvent = {
			onChange: (v: any) => emit('change', v),
			onVisibleChange: (v: boolean) => emit('visibleChange', v),
			onRemoveTag: (v: any) => {
				emit('removeTag', v)
			},
			onClear: () => emit('clear'),
			onBlur: (e: FocusEvent) => {
				emit('blur', e)
			},
			onFocus: (e: FocusEvent) => {
				emit('focus', e)
			}
		}

		return () => {
			const { itemConfig, formData } = props

			const _slots = { ...slots }

			delete _slots['option-default']
			delete _slots['option-group-default']

			let renderNode = []
			if (isGroup.value) {
				const groupOptions = itemConfig.groupOptions || []
				renderNode = groupOptions.map((group) => {
					const groupProps = fetchProps(group, isGroup.value)

					return h(
						ElOptionGroup,
						{ ...groupProps },
						{
							default: () =>
								slots['option-group-default']
									? [
											_renderOptions(group.options || []),
											slots['option-group-default']({
												formData: props.formData,
												itemConfig: props.itemConfig,
												params: group
											})
										]
									: _renderOptions(group.options || [])
						}
					)
				})
			} else {
				const options = itemConfig.options || []
				renderNode = _renderOptions(options)
			}

			return h(
				ElSelect,
				{
					clearable: true,
					...itemConfig!.selectProps,
					modelValue: formData[itemConfig.prop],
					...selectEvent
				},
				{
					default: () => renderNode,
					..._slots,
					label: (params: SelectLabelSlotParams) => {
						return _slots.label?.({
							params: params,
							formData: props.formData,
							itemConfig: props.itemConfig
						})
					}
				}
			)
		}
	}
})
