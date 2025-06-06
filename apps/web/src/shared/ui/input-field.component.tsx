import { Form, Input, InputProps } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

export interface InputFieldProps<
  TFormValues extends FieldValues = Record<string, unknown>
> extends InputProps {
  control: Control<TFormValues>;
  name: string;
  label: string;
}

const FormItem = styled(Form.Item)({
  display: "flex",
  flexDirection: "column"
});

export function InputField<
  TFormValues extends FieldValues = Record<string, unknown>
>({ control, name, label, ...props }: InputFieldProps<TFormValues>) {
  return (
    <Controller
      name={name as Path<TFormValues>}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem
          label={label}
          help={error?.message}
          validateStatus={error ? "error" : ""}
        >
          <Input {...field} {...props} />
        </FormItem>
      )}
    />
  );
}
