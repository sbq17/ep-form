/**
 * el input slot插槽
 */
export const InputSlot = ['prefix', 'suffix', 'prepend', 'append'] as const
/**
 * el select slot插槽
 */
export const SelectSlot = ['default', 'header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'] as const
/**
 * el number picker slot插槽
 */
export const NumberSlot = ['decrease-icon', 'increase-icon'] as const
/**
 * el date picker slot插槽
 */
export const DateSlot = ['default', 'range-separator', 'prev-month', 'next-month', 'prev-year', 'next-year'] as const

/**
 * el form item slot插槽
 */
export const FormItemSlot = ['label', 'error'] as const
