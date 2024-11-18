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
							:ref="(refInstacnce) => _onDynamicRef(refInstacnce, item.prop)"
						>
							<!-- :ref="(refInstacnce: PickFormItemExpose) => _onDynamicRef(refInstacnce, item.prop)" -->
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
											<slot :name="`${item.prop as string}-error-item`" :error="errorInfo" />
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
										<slot :name="`${item.prop as string}-label-item`" :label="labelInfo" />
									</template>
									<template v-else>
										<!-- 最后默认显示label -->
										{{ labelInfo.label }}
									</template>
								</template>
							</template>

							<!-- 组件渲染区域 todo-->
							<div class="ep_component_wrapper">
								<!-- :formData="formData" :itemConfig="item"  -->
								<FormItem />
								<!-- <component :is="renderItem(formData, item, emits, slots)" @valueInput="_input"></component> -->
								<!-- <el-input v-model="formData[item.prop]" /> -->
							</div>
						</el-form-item>
					</el-col>
					<div class="ep_btn_in_row_wrapper">
						<el-button>Default</el-button>
						<el-button type="primary">Primary</el-button>
						<el-button type="success">Success</el-button>
						<el-button type="info">Info</el-button>
						<el-button type="warning">Warning</el-button>
						<el-button type="danger">Danger</el-button>
					</div>
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

<script lang="ts" setup generic="DataType extends DefaultDataType = DefaultDataType">
// 泛型组件

// 导入样式
import 'element-plus/dist/index.css'
// 导入中文 默认中文显示
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
// configProps 配置
import { ConfigProviderProps } from 'element-plus'
// 类型
import { Props, EmitType, DefaultDataType, FormItemRef, EpFormProps, SlotType } from './type'
import { useShowColumns } from './hook/useColumns'
import { useFormConfig } from './hook/useFormConfig'
// import { renderItem, FormItem } from './render.item'
import FormItem from './render.item'

console.log(12312, 'init')

// 接收的props
const props = withDefaults(defineProps<Props<DataType>>(), {
	columns: () => [],
	configProviderProps: () => ({}),
	formProps: () => ({ labelWidth: 80 }) as EpFormProps,
	rowProps: () => ({}),
	colProps: () => ({})
})

// emits事件
const emits = defineEmits<EmitType>()

// defineSlots<any>()
const slots = defineSlots<SlotType<DataType>>()
// defineSlots<Record<string, any>>()

/**
 * 插槽配置
 */
// const slots = useSlots()

// 默认的configProvider配置
const defaultConfigProvider: Partial<ConfigProviderProps> = {
	locale: zhCn,
	size: 'small'
}

// 合并configProvider配置
const configProvider = computed(() => ({ ...defaultConfigProvider, ...props.configProviderProps }))

const { columnsList } = useShowColumns<DataType>(props)

const { formItemRef, formRef, errorRuleCustomList, labelCustomList, _onDynamicRef, _renderFn, _itemProps } =
	useFormConfig<DataType>(props, columnsList, slots)

// const formData = ref<Partial<DefaultDataType>>({})
const formData = ref<Partial<DefaultDataType>>({})

watch(
	() => props.modelValue,
	(nv) => {
		formData.value = (nv as Partial<DefaultDataType>) || {}
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

const _input = () => {
	//
}

onMounted(() => {
	formData.value = (props.modelValue as Partial<DefaultDataType>) || {}
})

defineExpose({
	formRef,
	formItemRef: formItemRef as Ref<Partial<FormItemRef<DataType>>>
})
</script>

<style lang="postcss" scoped>
.ep_custom_form_wrapper {
	width: 100%;
	--form-item-mb: 8px;
}

.ep_form {
	width: 100%;
}

.ep_form_item_wrapper {
	margin-bottom: var(--form-item-mb);
}

.ep_component_wrapper {
	width: 100%;

	> div {
		@apply !w-full;
	}

	::v-deep() {
		> div {
			@apply w-full;
		}
	}
}

/* 错误信息 */
.ep_error_msg {
	width: 100%;
	color: var(--el-color-danger);
}
</style>
