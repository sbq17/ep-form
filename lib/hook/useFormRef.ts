/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ShowColumnItem, EpFormDefaultExpose, PickFormItemExpose } from '../types'

export const useFormRef = () => {
	/**
	 * 表单ref
	 */
	const formRef = ref<EpFormDefaultExpose>()

	/**
	 * 表单项配置ref
	 */
	const formItemRef = ref<Record<string, PickFormItemExpose>>({})

	return {
		/**
		 * 表单ref
		 */
		formRef,
		/**
		 * 表单项配置ref
		 */
		formItemRef,
		/**
		 * 设置动态formItem实例ref
		 * @param v formItem方法实例
		 * @param prop columns配置属性
		 */
		_onDynamicRef: (v: any, prop: ShowColumnItem<any>['prop']) => {
			formItemRef.value[`${prop as string}FormItemRef`] = v as PickFormItemExpose
		}
	}
}
