import type { AllowedComponentProps } from 'vue'
import { VNode } from 'vue'
import type { ComponentCustomProps } from 'vue'
import type { ComponentOptionsMixin } from 'vue'
import type { CreateComponentPublicInstance } from 'vue'
import type { PublicProps } from 'vue'
import type { VNodeProps } from 'vue'
import type { EpEmitType, EpSlotType } from './types'
import { EpItem, EpProps } from './types'

export declare const EpForm: new <T extends {} = {}>(
	props: EpProps<T> & {} & VNodeProps & AllowedComponentProps & ComponentCustomProps
) => CreateComponentPublicInstance<
	EpProps<T> & {},
	{},
	{},
	{},
	{},
	ComponentOptionsMixin,
	ComponentOptionsMixin,
	EpEmitType<T>,
	// {},
	PublicProps,
	{},
	false,
	{},
	EpSlotType<T>,
	// {},
	{
		P: {}
		B: {}
		D: {}
		C: {}
		M: {}
		Defaults: {}
	},
	EpProps<T> & {},
	{},
	{},
	{},
	{},
	{}
>

export { EpItem, EpProps }
