<template>
	<div class="ep_custom_form_wrapper">
		<el-config-provider v-bind="configProvider">
			<el-form class="ep_form" v-bind="formProps" :model="formData" ref="formRef">
				<el-row v-bind="rowProps" class="ep_row">
					<el-col v-for="item in columnsList" :key="item.prop" v-bind="item.col">
						<!-- 渲染 form item -->
						<el-form-item
							v-bind="_itemProps(item)"
							class="ep_form_item_wrapper"
							:ref="(refInstacnce: PickFormItemExpose) => _onDynamicRef(refInstacnce, item.prop)"
						>
							<!-- form item error 插槽 -->
							<!-- 重写error插槽是为了更好的设置样式 -->
							<template #error="errorInfo">
								<div class="ep_error_msg">
									<!-- 优先自定义渲染的 -->
									<template v-if="item.errorRender">
										<component :is="_renderFn(item.errorRender({ errorInfo }))" />
									</template>
									<template v-else>
										<!-- 其次error插槽 -->
										<template v-if="errorRuleCustomList.includes(item.prop as string)">
											<slot :name="`${item.prop as string}-error-item`" :error="_returnErrorInfo(errorInfo)" />
										</template>
										<template v-else>
											<!-- 最后是error信息 -->
											{{ errorInfo.error }}
										</template>
									</template>
								</div>
							</template>

							<!-- form item label插槽 -->
							<template #label="labelInfo">
								<!-- 优先自定义label渲染 -->
								<template v-if="item.labelRender">
									<component :is="_renderFn(item.labelRender({ labelInfo }))" />
								</template>
								<template v-else>
									<!-- 其次slot显示 -->
									<template v-if="labelCustomList.includes(item.prop as string)">
										<slot :name="`${item.prop as string}-label-item`" :label="_returnLabelInfo(labelInfo)" />
									</template>
									<template v-else>
										<!-- 最后默认显示label -->
										{{ labelInfo.label }}
									</template>
								</template>
							</template>

							<!-- 组件渲染区域 -->
							<div class="ep_component_wrapper">
								<el-input v-model="formData[item.prop]" />
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-config-provider>
	</div>
</template>

<script lang="ts">
export default {
	name: 'EpCustomForm'
}
</script>

<script lang="ts" setup generic="DataType = DefaultDataType">
// 泛型组件

// 导入样式
import 'element-plus/dist/index.css'
// 导入中文 默认中文显示
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
// configProps 配置
import { ColProps, ConfigProviderProps, ElCol } from 'element-plus'
// 类型
import {
	Props,
	EmitType,
	DefaultDataType,
	ShowColumnItem,
	PickFormItemExpose,
	FormItemRef,
	EpFormProps,
	EpFormDefaultExpose,
	ReturnNodeType,
	ErrorMsg,
	LabelMsg
} from './type'
import { createTextVNode, h, UnwrapRef } from 'vue'

console.log(12312, 'init')

// 接收的props
const props = withDefaults(defineProps<Props<DataType>>(), {
	columns: () => [],
	configProviderProps: () => ({}),
	formProps: () => ({ labelWidth: 80 }) as EpFormProps,
	rowProps: () => ({}),
	colProps: () => ({})
})

const emits = defineEmits<EmitType>()

// 默认的configProvider配置
const defaultConfigProvider: Partial<ConfigProviderProps> = {
	locale: zhCn,
	size: 'small'
}

// 合并configProvider配置
const configProvider = computed(() => ({ ...defaultConfigProvider, ...props.configProviderProps }))

/**
 * 显示表单项
 */
const columnsList = computed(() => {
	// 显示表单项
	const _c = props.columns.filter(({ show }) => (show === undefined ? true : show))

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
 * 提取formItem属性配置
 * @param item 显示表单项
 */
const _itemProps = (item: ShowColumnItem<DataType>): Omit<ShowColumnItem<DataType>, 'col'> => {
	const { col, labelRender, errorRender, ...rest } = item
	return rest
}

const formData = ref<Partial<DataType>>({})

watch(
	() => props.modelValue,
	(nv) => {
		formData.value = nv || ({} as UnwrapRef<Partial<DataType>>)
	},
	{ deep: true }
)

watch(
	formData,
	(nv) => {
		emits('update:modelValue', nv)
	},
	{ deep: true }
)

onMounted(() => {
	formData.value = props.modelValue || ({} as UnwrapRef<Partial<DataType>>)
})

/**
 * 表单ref
 */
const formRef = ref<EpFormDefaultExpose>()

/**
 * 表单项配置ref
 */
const formItemRef = ref<Record<string, PickFormItemExpose>>({})

/**
 * 设置动态formItem实例ref
 * @param v formItem方法实例
 * @param prop columns配置属性
 */
const _onDynamicRef = (v: PickFormItemExpose, prop: ShowColumnItem<DataType>['prop']) => {
	formItemRef.value[`${prop as string}FormItemRef`] = v
}

/**
 * 插槽配置
 */
const slots = useSlots()

/**
 * 计算是否有自定义formItem error插槽
 */
const errorRuleCustomList = computed(() => {
	const formRules = props.formProps.rules || {}
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
 * 计算是否有自定义formItem error插槽
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
const _renderFn = (renderInfo: ReturnNodeType) => {
	if (typeof renderInfo === 'object') {
		return h(renderInfo)
	} else {
		return createTextVNode(renderInfo)
	}
}

const _returnErrorInfo = (info: ErrorMsg) => info
const _returnLabelInfo = (info: LabelMsg) => info

defineExpose({
	formRef,
	formItemRef: formItemRef as Ref<Partial<FormItemRef<DataType>>>
})
</script>

<style lang="postcss" scoped>
/* 导入样式库 */
@import './index.css';

.ep_custom_form_wrapper {
	@apply w-full;
}

.ep_form {
	@apply w-full;
}

.ep_form_item_wrapper {
	@apply mb-2;
}

.ep_component_wrapper {
	@apply w-full;
}

/* 错误信息 */
.ep_error_msg {
	@apply text-red-400 w-full;
}
</style>
