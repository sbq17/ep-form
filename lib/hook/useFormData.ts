/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultDataType, EmitType, EpItemEmitParams, Props } from '../types'

export const useFormData = <DataType extends DefaultDataType>(
	props: Props<DataType>,
	emits: EmitType<DataType>
) => {
	/**
	 * 发送表单数据
	 * 当组件的'onUpdate:modelValue'属性存在时，此函数会被调用
	 * 它负责将更新后的表单数据通过事件形式发送出去
	 *
	 * @param formData 更新后的表单数据对象
	 */
	const emitFormData = (formData: DataType) => {
		// 检查是否存在'onUpdate:modelValue'属性，即更新回调函数
		if (props['onUpdate:modelValue']) {
			// 触发'update:modelValue'事件，传递更新后的表单数据
			emits('update:modelValue', formData)
		}
	}

	/**
	 * 处理项目输入事件的函数
	 *
	 * 此函数旨在响应组件的输入事件，执行必要的回调，并更新表单数据
	 * 它首先检查是否存在一个名为'onEpInput'的属性，如果存在，则触发'epInput'事件
	 * 随后，它更新表单数据，通过将当前的modelValue与新的输入参数合并，确保表单数据的实时更新
	 *
	 * @param params 包含数据属性和值的对象，用于更新表单数据
	 */
	const itemInput = (params: EpItemEmitParams<DataType>) => {
		// 检查是否存在'onEpInput'属性，如果存在，则触发'epInput'事件
		if (props.onEpInput) {
			emits('epInput', params)
		}

		// 更新表单数据，通过将当前的modelValue与新的输入参数合并
		emitFormData({ ...props.modelValue, [params.prop]: params.value } as any)
	}

	/**
	 * 处理项目失焦事件
	 *
	 * 当发生失焦事件时，此函数会被调用它负责通知父组件或其他监听失焦事件的组件
	 * 主要用于事件传递和自定义事件处理逻辑
	 *
	 * @param params 类型为 EpItemEmitParams<DataType> 的参数，包含了失焦事件的相关数据
	 */
	const itemBlur = (params: EpItemEmitParams<DataType>) => {
		// 检查是否有自定义的失焦事件处理函数被传入
		if (props.onEpBlur) {
			// 触发自定义事件 'epBlur'，并传递事件参数
			emits('epBlur', params)
		}
	}

	/**
	 * 处理项目变更事件
	 * 此函数被设计为响应项目的变更，当项目发生变化时，它会根据props中的配置决定是否触发相应的回调
	 *
	 * @param params {EpItemEmitParams<DataType>} - 包含项目变更相关信息的参数
	 */
	const itemChange = (params: EpItemEmitParams<DataType>) => {
		// 检查是否有onEpChange回调函数被传入，如果有，则触发该回调并传递参数
		if (props.onEpChange) {
			emits('epChange', params)
		}
	}

	/**
	 * 当列表项获得焦点时调用的函数
	 *
	 * 此函数的作用是当列表项被聚焦时，根据传入的参数触发焦点事件
	 * 它首先检查是否提供了 onEpFocus 回调函数如果提供了，则调用该回调函数并传递相关参数
	 *
	 * @param params - 包含焦点事件相关数据的对象
	 */
	const itemFocus = (params: EpItemEmitParams<DataType>) => {
		if (props.onEpFocus) {
			emits('epFocus', params)
		}
	}

	/**
	 * 执行项清除操作的函数
	 * 此函数用于在组件中处理清除项的事件当满足特定条件时，它会触发一个自定义事件
	 *
	 * @param params - 事件参数，具体类型为 EpItemEmitParams<DataType>，包含了与数据类型相关的清除事件信息
	 */
	const itemClear = (params: EpItemEmitParams<DataType>) => {
		console.log(params)

		// 检查是否存在 onEpClear 属性，这是决定是否触发清除事件的条件
		if (props.onEpClear) {
			// 触发 'epClear' 事件，并传递相关参数
			emits('epClear', params)
		}
	}

	return {
		/**
		 * 更新表单数据
		 */
		emitFormData,
		/**
		 * 表单数据input事件
		 */
		itemInput,
		/**
		 * 表单数据blur事件
		 */
		itemBlur,
		/**
		 * 表单数据change事件
		 */
		itemChange,
		/**
		 * 表单数据focus事件
		 */
		itemFocus,
		/**
		 * 表单数据clear事件
		 */
		itemClear
	}
}
