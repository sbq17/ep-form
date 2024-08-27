<template>
	<Cpn v-model="data" :columns="columns" ref="epFormRef">
		<!-- <template v-slot:label_3-error-item="{ error }"> 12312 {{ error }} </template> -->
	</Cpn>
</template>

<script lang="ts" setup>
import Cpn from './components/index.vue'
import { CustomFormItem, EpFormExpose } from './components/type'

type TestProp = { label_1: string; label_2: string; label_3: string; label_4: string }

const columns: CustomFormItem<TestProp>[] = [
	{ label: 'label_1', prop: 'label_1', col: 12, required: true },
	{
		label: 'label_3',
		prop: 'label_3',
		col: 12,
		required: true
	},
	{ label: 'label_2', prop: 'label_2' },
	{ label: 'label_4', prop: 'label_4', show: false }
]

const epFormRef = ref<EpFormExpose<TestProp>>()

const data = ref<Partial<TestProp>>({ label_1: '12312' })
</script>
