/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import type {
	DefaultDataType,
	EpOptionGroup,
	EpOptionItem,
	SelectItemProps,
	SelectLabelSlotParams
} from '../types'
import { camelCase, cloneDeep, toLower } from 'lodash-es'

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

		const _filterOptionsFn = (query: string) => {
			const { itemConfig } = props
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { groupOptions, options, renderType, slot, ...rest } = itemConfig

			const _options = (isGroup.value ? groupOptions : options) || []

			return new Promise<typeof _options>((resolve) => {
				const selectProps = itemConfig.selectProps

				if (selectProps?.remoteMethod) {
					const _filterOptions = selectProps.remoteMethod({
						query,
						formData: props.formData,
						groupOptions: cloneDeep(groupOptions),
						options: cloneDeep(options),
						itemConfig: rest
					})

					if (_filterOptions) {
						const isPromise = _filterOptions instanceof Promise
						if (isPromise) {
							_filterOptions.then((responseOptions) => {
								resolve(responseOptions || _options)
							})
						} else {
							resolve(_filterOptions)
						}
					}
				} else {
					if (selectProps?.remote) {
						const { fuzzySearch, fuzzySearchMode } = itemConfig

						/**
						 * 通过option配置项数据来过滤自定义查询函数用来替代remoteMethod
						 * @description 如果开启模糊搜索fuzzySearch, 则开启模糊搜索匹配的方式，否则的话则自动匹配展示的label文本
						 * @description 如果还定义了fuzzySearchMode, 则捡取对应的option项数据进行全字段匹配
						 * @param item option配置项数据
						 * @returns
						 */
						const _filterFn = (item: EpOptionItem<DefaultDataType>): boolean => {
							const props = fetchProps(item, false)

							if (fuzzySearchMode && fuzzySearchMode.length) {
								let flag = false

								for (let i = 0; i < fuzzySearchMode.length; i++) {
									const prop = fuzzySearchMode[i]

									let v =
										props[prop as keyof typeof props] === void 0
											? item[prop] || ''
											: props[prop as keyof typeof props]

									if (['string', 'number'].includes(typeof v)) {
										v = fuzzySearch ? toLower(camelCase(v + '')) : v + ''
										query = fuzzySearch ? toLower(camelCase(query)) : query

										flag = v.includes(query)
										if (flag) {
											break
										}
									}
								}

								return flag
							} else {
								const v = fuzzySearch ? toLower(camelCase(props.label + '')) : props.label + ''
								query = fuzzySearch ? toLower(camelCase(query)) : query
								return v.includes(query)
							}
						}

						if (isGroup.value) {
							resolve(
								cloneDeep(_options).map((item) => {
									const options = ((item.options as EpOptionItem<DefaultDataType>[]) || []).filter(
										_filterFn
									)

									item.options = options
									return item
								})
							)
						} else {
							resolve(cloneDeep(_options as EpOptionItem<DefaultDataType>[]).filter(_filterFn))
						}
					}
					resolve(_options)
				}
			})
		}

		const queryString = ref('')

		const showOptions = ref<EpOptionItem<DefaultDataType>[] | EpOptionGroup<DefaultDataType>[]>([])

		watchEffect(() => {
			_filterOptionsFn(queryString.value).then((data) => {
				showOptions.value = data || []
			})
		})

		/**
		 * 根据配置获取选项的属性
		 * @param item 选项组或选项项
		 * @param isGroup 是否为选项组
		 * @returns 返回处理后的选项属性
		 */
		function fetchProps(
			item: EpOptionGroup<DefaultDataType> | EpOptionItem<DefaultDataType>,
			isGroup: boolean
		) {
			// 解构获取配置项中的标签、值和键的属性
			const { optionLabel, optionValue, optionKey } = props.itemConfig || {}

			// 根据配置获取标签
			const label = optionLabel
				? typeof optionLabel === 'function'
					? optionLabel({ formData: props.formData, itemConfig: props.itemConfig })
					: optionLabel
				: 'label'

			// 根据配置获取禁用状态
			const disabled = item.disabled
				? typeof item.disabled === 'function'
					? item.disabled({ formData: props.formData, itemConfig: props.itemConfig })
					: item.disabled
				: false

			// 根据配置获取键值，如果没有配置键值，则使用标签作为键
			const key = optionKey ? item[optionKey] : (item[label] as string)

			// 如果是选项组，则返回选项组的属性
			if (isGroup) {
				return {
					key,
					label: item[label] + '',
					disabled
				}
			} else {
				// 如果不是选项组，则根据配置获取值的属性
				const valueKey = optionValue
					? typeof optionValue === 'function'
						? optionValue({ formData: props.formData, itemConfig: props.itemConfig })
						: optionValue
					: 'value'

				// 返回选项项的属性
				return {
					key,
					label: item[label] + '',
					value: item[valueKey] as string,
					disabled
				}
			}
		}

		/**
		 * 渲染选项列表
		 * 此函数负责将给定的选项数组转换为用于渲染的实际组件数组
		 * 它利用了map函数来遍历每个选项，并将其转换为一个ElOption组件
		 *
		 * @param options EpOptionItem类型的数组，代表需要渲染的选项
		 * @returns 返回一个由ElOption组件构成的数组
		 */
		const _renderOptions = (options: EpOptionItem<DefaultDataType>[]) => {
			return options.map((option) => {
				// 获取选项的属性，并将其转换为所需的props
				const optionProps = fetchProps(option, false) as any

				// 创建并返回一个ElOption组件，将其属性设置为optionProps，并提供默认插槽内容
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
				const groupOptions = showOptions.value as EpOptionGroup<DefaultDataType>[]
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
				const options = showOptions.value as EpOptionItem<DefaultDataType>[]
				renderNode = _renderOptions(options)
			}

			const { selectProps } = itemConfig

			if (selectProps?.remoteMethod) {
				selectProps.filterable = selectProps.filterable === void 0 ? true : selectProps.filterable
				selectProps.remote = selectProps.remote === void 0 ? true : selectProps.remote
			} else {
				if (selectProps?.remote === true) {
					selectProps.filterable = selectProps.filterable === void 0 ? true : selectProps.filterable
				}
			}

			return h(
				ElSelect,
				{
					clearable: true,
					...selectProps,
					remoteMethod: (query: string) => {
						queryString.value = query
					},
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
