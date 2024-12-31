/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { SetupContext } from 'vue'
import type { EpEmitType, EpProps, EpSlotType } from './types'

const EpForm = defineComponent(
	<T extends {} = {}>(props: EpProps<T>, ctx: SetupContext<EpEmitType<T>, EpSlotType<T>>) => {
		console.log(ctx, props)

		return () => h('div', { class: 'ep_form_wrapper' }, '12312')
	},
	{
		name: 'EpForm',
		// props: ['columns', 'onUpdate:modelValue']
		props: {
			modelValue: {
				type: Object as PropType<EpProps['modelValue']>,
				default: () => ({}) as EpProps['modelValue'],
				required: false
			},
			columns: {
				type: Array as PropType<EpProps['columns']>,
				default: () => [] as EpProps['columns'],
				required: false
			}
		}
	}
)

export default EpForm
