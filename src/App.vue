<template>
	<div>
		<EpForm :columns="columns" v-model="data">
			<!--  -->
		</EpForm>

		<div>
			<!--  -->
		</div>
	</div>
</template>

<script lang="ts" setup>
// import { type EpColumnItem, EpForm } from '../lib/main'
import { type EpColumnItem, EpForm } from '../dist'
import '../dist/style.css'

type TestProp = { label_1: string; label_2: string; label_3: string; label_4: string }

const _options = [
	{ value: 'value_0', label: 0 },
	{ value: 'value_10', label: 10 },
	{ value: '选项3', label: 'test3' },
	{ value: '选项4', label: 'test4' },
	{ value: '选项5', label: 'test5' }
]

const selectItem: EpColumnItem<TestProp> = {
	label: 'label_3',
	prop: 'label_3',
	renderType: 'select',
	col: 24,
	options: _options,
	slot: {},
	selectProps: {
		// remote: true
	}
}

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
		label: 'label_2',
		prop: 'label_2',
		col: 12,
		required: true,
		renderType: 'date'
	},
	selectItem,
	{ label: 'label_4', prop: 'label_4', renderType: 'render' }
]

const data = ref<Partial<TestProp>>({ label_1: '12312', label_2: '' })
</script>
