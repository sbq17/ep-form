/* eslint-disable @typescript-eslint/no-empty-object-type */
// import type { DateSlot, InputSlot, NumberSlot, SelectSlot } from '../slots'
import type { ReturnNodeType } from './variables'

declare type DateSlot = readonly ['default', 'range-separator', 'prev-month', 'next-month', 'prev-year', 'next-year']
declare type InputSlot = readonly ['prefix', 'suffix', 'prepend', 'append']
declare type NumberSlot = readonly ['decrease-icon', 'increase-icon']
declare type SelectSlot = readonly ['default', 'header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label']

/**
 * slot类型转换
 * @template SlotType 生成slot集合
 * @template DataType 数据类型
 * @template K 键值
 */
export declare type SlotTypeTrans<
	SlotTypeList extends readonly string[],
	DataType extends {},
	K extends keyof DataType = keyof DataType
> = {
	[SlotName in SlotTypeList[number] as `${K}-render-${SlotName}`]: (...args) => ReturnNodeType
}

/**
 * 定义formItem中slot名称
 * @template DataType 数据类型
 * @template K 键值
 */
export declare type SlotFormItemType<DataType extends {}, K extends keyof DataType = keyof DataType> = {
	[SlotName in ['error-item' | 'label-item'][number] as `${K}-${SlotName}`]: (...args) => ReturnNodeType
}

/**
 * 生成slot集合
 * @template DataType 数据类型
 * @template K 键值
 */
export declare type EpSlotType<DataType extends {} = {}> = SlotTypeTrans<InputSlot, DataType> &
	SlotTypeTrans<DateSlot, DataType> &
	SlotTypeTrans<NumberSlot, DataType> &
	SlotTypeTrans<SelectSlot, DataType> &
	SlotFormItemType<DataType>
