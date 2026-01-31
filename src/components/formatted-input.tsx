import { Input } from './ui/input'

export function FormattedNumberInput({
  field,
  className = '',
  placeholder = '0',
  disabled = false,
}: {
  field: any
  className?: string
  placeholder?: string
  disabled?: boolean
}) {
  const display = field.value?.toLocaleString('en-US') ?? ''

  return (
    <Input
      disabled={disabled}
      type='text'
      inputMode='numeric'
      pattern='[0-9]*'
      placeholder={placeholder}
      className={`text-right ${className}`}
      value={display}
      onChange={(e) => {
        const raw = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
        field.onChange(raw === '' ? undefined : Number(raw))
      }}
      onBlur={field.onBlur}
    />
  )
}
