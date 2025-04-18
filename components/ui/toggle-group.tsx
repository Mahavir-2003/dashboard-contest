"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
    type?: "single" | "multiple"
  }
>({
  size: "default",
  variant: "default",
})

interface ToggleGroupProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof toggleVariants> {
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: "single" | "multiple"
  disabled?: boolean
}

function ToggleGroup({
  className,
  variant,
  size,
  children,
  value,
  defaultValue,
  onValueChange,
  type = "single",
  disabled = false,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue || (type === "multiple" ? [] : ""))
  
  const currentValue = value !== undefined ? value : internalValue
  
  const handleValueChange = React.useCallback((value: string | string[]) => {
    const itemValue = typeof value === 'string' ? value : value[0];
    
    if (type === "multiple" && Array.isArray(currentValue)) {
      const newValue = currentValue.includes(itemValue)
        ? currentValue.filter(v => v !== itemValue)
        : [...currentValue, itemValue]
      
      setInternalValue(newValue)
      onValueChange?.(newValue)
    } else {
      const newValue = currentValue === itemValue ? "" : itemValue
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }
  }, [currentValue, onValueChange, type])

  return (
    <div
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      role="group"
      {...props}
    >
      <ToggleGroupContext.Provider value={{ 
        variant, 
        size, 
        value: currentValue,
        onValueChange: handleValueChange,
        type
      }}>
        {children}
      </ToggleGroupContext.Provider>
    </div>
  )
}

interface ToggleGroupItemProps extends
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange">,
  VariantProps<typeof toggleVariants> {
  value: string
  disabled?: boolean
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  value,
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  
  const isSelected = context.type === "multiple" 
    ? Array.isArray(context.value) && context.value.includes(value)
    : context.value === value

  const handleClick = () => {
    if (!disabled) {
      context.onValueChange?.(value)
    }
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-state={isSelected ? "on" : "off"}
      data-disabled={disabled ? true : undefined}
      disabled={disabled}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      onClick={handleClick}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { ToggleGroup, ToggleGroupItem }