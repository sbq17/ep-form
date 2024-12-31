import type { DefaultDataType, EpColumnItem, SlotType } from '../types'

export const usePickSlots = <DataType extends DefaultDataType>() => {
	const renderItemSlotName = (prop: EpColumnItem['prop'], type: 'error' | 'label') => {
		return `${prop}-${type}-item` as keyof SlotType<DataType>
	}

	return {
		renderItemSlotName
	}
}
