import React from 'react'
import { Button } from "@/components/ui/button"
import {Controller, FieldValues, Control, Path} from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password'|'file';
}

const FormField = ({name, control, label , placeholder, type = "text"} : FormFieldProps<T> ) => (
    <Controller 
    name={name} 
    control={control} 
    render={({ field }) => (
      <FormItem>
        <FormLabel className='label'> {label}</FormLabel>
        <FormControl>
          <Input 
          placeholder={placeholder} 
          type={type}
          {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormField