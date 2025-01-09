<template>
	<div class="ep_custom_form_wrapper">
		<el-config-provider v-bind="configProvider">
			<el-form class="ep_form" v-bind="formProps" :model="formData" ref="formRef">
				<el-row v-bind="rowProps" class="ep_row">
					<el-col v-for="item in columnsList" :key="item.prop" v-bind="item.col">
						<!-- 渲染 form item -->
						<el-form-item
							class="ep_form_item_wrapper"
							v-bind="pickFromItemProps(item)"
							:ref="(refInstacnce) => _onDynamicRef(refInstacnce, item.prop)"
						>
							<!-- form item error 插槽 -->
							<!-- 重写error插槽是为了更好的设置样式 -->
							<template #error="errorInfo">
								<div class="ep_error_msg">
									<!-- 优先自定义渲染的 -->
									<template v-if="item.errorRender">
										<component :is="renderFormLabelErrorFn(item.errorRender({ errorInfo }))" />
									</template>
									<template v-else>
										<!-- 其次error插槽 -->
										<template v-if="errorRuleCustomList.includes(item.prop as string)">
											<slot :name="renderItemSlotName(item.prop, 'error')" :msg="errorInfo" />
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
									<component :is="renderFormLabelErrorFn(item.labelRender({ labelInfo }))" />
								</template>
								<template v-else>
									<!-- 其次slot显示 -->
									<template v-if="labelCustomList.includes(item.prop as string)">
										<slot :name="renderItemSlotName(item.prop, 'label')" :msg="labelInfo" />
									</template>
									<template v-else>
										<!-- 最后默认显示label -->
										{{ labelInfo.label }}
									</template>
								</template>
							</template>

							<!-- 组件渲染区域 todo-->
							<div class="ep_component_wrapper">
								<EpFormItem
									:define-slots="slots"
									:form-data="formData"
									:item-config="item"
									@item-input="itemInput"
									@item-blur="itemBlur"
									@item-change="itemChange"
									@item-focus="itemFocus"
									@item-clear="itemClear"
								/>
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

<script lang="ts" setup generic="DataType extends DefaultDataType">
// 泛型组件

// 导入样式
import 'element-plus/dist/index.css'
// 导入中文 默认中文显示
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
// 数据
import { useFormConfig } from './hook/useFormConfig'
import { useFormRef } from './hook/useFormRef'
import { usePickSlots } from './hook/usePickSlots'

import EpFormItem from './render/render.item'

/**
 * 类型
 */
// configProps 配置
import type { ConfigProviderProps } from 'element-plus'
import type { EpFormProps, Props, DefaultDataType, EmitType, FormItemRef, SlotType } from './types'
import type { UnwrapRef } from 'vue'
import { useFormData } from './hook/useFormData'

/**
 * 接收的props
 */
const props = withDefaults(defineProps<Props<DataType>>(), {
	columns: () => [],
	configProviderProps: () => ({}),
	formProps: () => ({ labelWidth: 80 }) as EpFormProps<DataType>,
	rowProps: () => ({}),
	colProps: () => ({})
})

/**
 * emits事件
 */
const emits = defineEmits<EmitType<DataType>>()

/**
 * 插槽配置
 */
const slots = defineSlots<SlotType<DataType>>()

// 默认的configProvider配置
const defaultConfigProvider: Partial<ConfigProviderProps> = {
	locale: zhCn,
	size: 'small'
}

// 合并configProvider配置
const configProvider = computed(() => ({ ...defaultConfigProvider, ...props.configProviderProps }))

const { _onDynamicRef, formItemRef, formRef } = useFormRef()

const {
	columnsList,
	errorRuleCustomList,
	labelCustomList,
	renderFormLabelErrorFn,
	pickFromItemProps
} = useFormConfig(props, slots)

const { renderItemSlotName } = usePickSlots<DataType>()

const { emitFormData, itemBlur, itemChange, itemFocus, itemInput, itemClear } =
	useFormData<DataType>(props, emits)

// const formData = ref<Partial<DataType>>({})
const formData = ref<Partial<DefaultDataType>>({})

watch(
	() => props.modelValue,
	(nv) => {
		formData.value = (nv || {}) as UnwrapRef<Partial<DefaultDataType>>
	},
	{ deep: true }
)

watch(
	formData,
	(nv) => {
		emitFormData(nv as any)
		// emits('update:modelValue', nv as any)
	},
	{ deep: true }
)

defineExpose({
	formRef,
	formItemRef: formItemRef as Ref<Partial<FormItemRef<DataType>>>
})

// onUpdated(() => {})
// onBeforeUpdate(() => {})
// onErrorCaptured(() => {})
// onRenderTracked(() => {})
// onRenderTriggered(() => {})
// onActivated(() => {})
// onDeactivated(() => {})
// onServerPrefetch(() => {})

// onBeforeMount(() => {})

onMounted(() => {
	formData.value = (props.modelValue || {}) as UnwrapRef<Partial<DefaultDataType>>
})

// onBeforeUnmount(() => {})

// onUnmounted(() => {})
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

	::v-deep() {
		> div {
			@apply w-full;
		}

		.el-input {
			.el-input-group__prepend,
			.el-input-group__append {
				@apply px-2;
			}

			.el-input__prefix {
				@apply pr-1;
			}

			.el-input__suffix {
				@apply pl-1;
			}
		}
	}
}

/* 错误信息 */
.ep_error_msg {
	width: 100%;
	color: var(--el-color-danger);
}
</style>

<style lang="postcss">
/* 自定义date部分样式 */
.ep_date_popper {
	.el-date-picker {
		.el-date-picker__header {
			@apply p-0 h-7 mt-2 px-3;

			.el-date-picker__prev-btn,
			.el-date-picker__next-btn {
				@apply h-full flex gap-1;

				button {
					@apply m-0 text-sm;
				}
			}
		}

		.el-picker-panel__content {
			@apply m-0 mx-3 w-auto;
		}
	}

	.el-date-range-picker {
		.el-date-range-picker__content {
			@apply p-0;
		}

		.el-date-range-picker__header {
			@apply p-0 h-7 mt-2 px-3;

			button {
				@apply m-0 h-full text-sm;
			}
		}
	}
}
</style>
