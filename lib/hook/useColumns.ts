import { ColProps } from 'element-plus'
import { DefaultDataType, Props, ShowColumnItem } from '../type'

/**
 * 获取定义的columns配置
 * @param props 组件属性
 * @returns
 */
export const useShowColumns = <DataType = DefaultDataType>(props: Props<DataType>) => {
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

	return {
		/**
		 * 显示表单项
		 */
		columnsList
	}
}
