<template>
	<div class="ep_custom_form_wrapper">
		<el-config-provider v-bind="configProvider">
			<el-form class="ep_form" v-bind="formProps" :model="formData" ref="formRef">
				<el-row v-bind="rowProps" class="ep_row">
					<el-col v-for="item in columnsList" :key="item.prop" v-bind="item.col">
						<el-form-item
							v-bind="_itemProps(item)"
							class="ep_form_item_wrapper"
							:ref="(refInstacnce: PickFormItemExpose) => _onDynamicRef(refInstacnce, item.prop as string)"
						>
							<!-- <template #label> 12312</template>
							<template #error="dwad">
								{{ dwad }}
							</template> -->
							<el-input v-model="formData[item.prop]" />
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
	DefaultDataType,
	ShowColumnItem,
	PickFormItemExpose,
	FormItemRef,
	EpFormProps,
	EpFormDefaultExpose,
	EmitType
} from './type'
import { UnwrapRef } from 'vue'

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
	const { col, ...rest } = item
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
const _onDynamicRef = (v: PickFormItemExpose, prop: ShowColumnItem['prop']) => {
	formItemRef.value[`${prop}FormItemRef`] = v
}

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
</style>
