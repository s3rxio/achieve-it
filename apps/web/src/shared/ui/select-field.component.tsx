import { Form, Select, SelectProps } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface SelectFieldProps<
  TFormValues extends FieldValues = Record<string, unknown>
> extends SelectProps {
  control: Control<TFormValues>;
  name: string;
  label?: string;
}

export function SelectField<
  TFormValues extends FieldValues = Record<string, unknown>
>({ control, name, label, ...props }: SelectFieldProps<TFormValues>) {
  return (
    <Controller
      name={name as Path<TFormValues>}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          help={error?.message}
          validateStatus={error ? "error" : ""}
        >
          <Select {...field} {...props} />
        </Form.Item>
      )}
    />
  );
}
