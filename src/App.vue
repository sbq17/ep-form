<template>
	<EpCustomForm :columns="columns" v-model="data">
		<template #label_1-error-item="{ msg }">{{ msg }}</template>
	</EpCustomForm>
</template>

<script lang="ts" setup>
import { type EpColumnItem, EpCustomForm } from '../lib/main'

type TestProp = { label_1: string; label_2: string; label_3: string; label_4: string }

const columns: EpColumnItem<TestProp>[] = [
	{
		label: 'label_1',
		prop: 'label_1',
		col: 12,
		required: true,
		renderType: 'input',
		inputProps: {
			clearable: true
		}
	},
	{
		label: 'label_3',
		prop: 'label_3',
		col: 12,
		required: true,
		renderType: 'date'
	},
	{ label: 'label_2', prop: 'label_2', renderType: 'number', col: 12 },
	{ label: 'label_3', prop: 'label_3', renderType: 'select', col: 24 },
	{ label: 'label_4', prop: 'label_4', renderType: 'format' }
]

const data = ref<Partial<TestProp>>({ label_1: '12312', label_2: 'xxxx-label-2' })
</script>
