import { DatePicker, DatePickerProps, Form } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface DatePickerFieldProps<
  TFormValues extends FieldValues = Record<string, unknown>
> extends DatePickerProps {
  control: Control<TFormValues>;
  name: string;
  label: string;
}

export function DatePickerField<
  TFormValues extends FieldValues = Record<string, unknown>
>({ control, name, label, ...props }: DatePickerFieldProps<TFormValues>) {
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
          <DatePicker {...field} {...props} />
        </Form.Item>
      )}
    />
  );
}
