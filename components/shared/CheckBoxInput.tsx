import * as React from "react"

import { cn } from "@/lib/utils"

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className="hidden peer"
        ref={ref}
        {...props}
      />
    )
  }
)
CheckboxInput.displayName = "Input"

export { CheckboxInput }