import { Control } from "react-hook-form";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

import { formSchema } from "./AddMovieForm";

type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  htmlFor?: string;
  icon: string;
  bg: string;
};

export const CheckBoxCustomField = ({
  control,
  render,
  name,
  formLabel,
  htmlFor,
  icon,
  bg
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center content-center text-center justify-center">
          <FormControl>{render({ field })}</FormControl>
          {formLabel &&
            <FormLabel
              htmlFor={htmlFor}
              className={`select-none cursor-pointer rounded-lg border-2 border-gray-200
              py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 flex gap-4 items-center content-center text-center justify-center ${bg}`}>
                <img src={`/assets/icons/${icon}`} alt="" width={20} height={20}/>
              {formLabel}
            </FormLabel>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};