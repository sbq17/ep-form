import { createTextVNode, h, type SetupContext } from 'vue'
import type { ColProps, FormItemContext } from 'element-plus'
import type { ShowColumnItem } from '../types/column'
import type { Props } from '../types/props'
import type { ReturnNodeType } from '../types/variables'

/**
 * 定义表单配置
 * @param props 组件属性
 * @param columnsList 显示配置
 * @param slots 插槽
 * @returns
 */
export const useFormConfig = <DataType>(props: Props<DataType>, slots: SetupContext['slots']) => {
	/**
	 * 显示表单项
	 */
	const columnsList = computed(() => {
		// 显示表单项
		const _c = props.columns!.filter(({ show }) => (show === undefined ? true : show))

		// 需要排序显示的项
		const _order = _c.filter(({ order }) => order !== void 0)
		// 不需要排序显示的项
		const _not_order = _c.filter(({ order }) => order === void 0)

		const showList = _order.sort((a, b) => b.order! - a.order!).concat(_not_order)

		showList.forEach((item) => {
			let _col = item.col

			if (typeof _col === 'number') {
				item.col = { ...props.colProps, span: _col }
			} else if (typeof _col === 'string') {
				item.col = { ...props.colProps, span: Number(_col) }
			} else {
				item.col = { ...props.colProps, ...(_col as Partial<ColProps>) }
			}

			_col = item.col
			item.col = { ...item.col, span: _col.span || 24 }
		})

		return showList as ShowColumnItem<DataType>[]
	})

	/**
	 * 计算是否有自定义formItem error插槽
	 */
	const errorRuleCustomList = computed(() => {
		const formRules = props.formProps!.rules || {}
		return columnsList.value.reduce<string[]>((_merge, { required, rules, prop }) => {
			const _rule = formRules[prop as string]

			if (
				slots[`${prop as string}-error-item`] &&
				(required === true || (rules && rules.length) || (_rule && _rule.length))
			) {
				_merge.push(prop as string)
			}
			return _merge
		}, [])
	})

	/**
	 * 计算是否有自定义formItem label插槽
	 */
	const labelCustomList = computed(() => {
		return columnsList.value.reduce<string[]>((_merge, { prop }) => {
			if (slots[`${prop as string}-label-item`]) {
				_merge.push(prop as string)
			}
			return _merge
		}, [])
	})

	/**
	 * 自定义渲染slot转换函数
	 * @param renderInfo 渲染组件信息
	 */
	const renderFormLabelErrorFn = (renderInfo: ReturnNodeType) => {
		if (typeof renderInfo === 'object') {
			return h(renderInfo)
		} else {
			return createTextVNode(renderInfo)
		}
	}

	return {
		/**
		 * 计算是否有自定义formItem error插槽
		 */
		errorRuleCustomList,
		/**
		 * 计算是否有自定义formItem label插槽
		 */
		labelCustomList,
		/**
		 * 自定义渲染slot转换函数
		 * @param renderInfo 渲染组件信息
		 */
		renderFormLabelErrorFn,
		/**
		 * 提取formItem属性配置
		 * @param item 显示表单项
		 */
		pickFromItemProps: (item: ShowColumnItem<DataType>): Partial<FormItemContext> => {
			const { label, prop, formItemProps, rules, required } = item

			return {
				label,
				required,
				prop: prop as string,
				rules,
				...formItemProps
			}
		},
		/**
		 * 显示表单项
		 */
		columnsList
	}
}
