<template>
	<EpCustomForm :columns="columns" v-model="data" :>
		<template #> dwadw </template>
		<!-- <template v-slot:label_3-error-item="{ error }"> 12312 {{ error.error }} </template> -->
	</EpCustomForm>
</template>

<script lang="ts" setup>
import EpCustomForm from '../lib/main'
import { CustomFormItem, EpFormExpose } from '../lib/type'
import CusomF from '../dist'

type TestProp = { label_1: string; label_2: string; label_3: string; label_4: string }

const columns: CustomFormItem<TestProp>[] = [
	{ label: 'label_1', prop: 'label_1', col: 12, required: true, renderType: 'input' },
	{
		label: 'label_3',
		prop: 'label_3',
		col: 12,
		required: true,
		renderType: 'input'
	},
	{ label: 'label_2', prop: 'label_2', renderType: 'text', col: 12 },
	{ label: 'label_2', prop: 'label_2', renderType: 'text', col: 12 },
	{ label: 'label_4', prop: 'label_4', show: false, renderType: 'text' }
]

const epFormRef = ref<EpFormExpose<TestProp>>()

const data = ref<Partial<TestProp>>({ label_1: '12312', label_2: 'xxxx-label-2' })
</script>
