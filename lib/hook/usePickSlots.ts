import type { DefaultDataType, EpColumnItem, SlotType } from '../types'

export const usePickSlots = <DataType extends DefaultDataType>() => {
	const renderItemSlotName = (prop: EpColumnItem<DataType>['prop'], type: 'error' | 'label') => {
		return `${prop as string}-${type}-item` as keyof SlotType<DataType>
	}

	return {
		renderItemSlotName
	}
}
