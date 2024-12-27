import './style/index.css'
import type { SetupContext } from 'vue'
import type { EpEmitType, EpProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EpForm = defineComponent(<T = any>(props: EpProps<T>, ctx: SetupContext<EpEmitType<T>>) => {
	console.log(ctx, props)

	return () => h('div', {}, '12312')
})

export default EpForm

export { EpForm }
// export type { EpEmitType, EpProps }

