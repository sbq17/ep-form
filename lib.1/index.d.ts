import type { DefineSetupFnComponent } from 'vue'
import type { EpEmitType, EpItem, EpProps, EpSlotType } from './types'

export type { EpEmitType, EpItem, EpProps }

type EpFormComponent<T> = DefineSetupFnComponent<EpProps<T>, EpEmitType<T>, EpSlotType<T>>
// type EpFormComponent<T> = DefineSetupFnComponent<EpProps<T>, EpEmitType<T>, EpSlotType<T>>

declare const _default: <T>() => EpFormComponent<T>

export declare const EpForm: <T>() => EpFormComponent<T>

export default _default

