import { Form, Input, InputProps } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface InputFieldProps<
  TFormValues extends FieldValues = Record<string, unknown>
> extends InputProps {
  control: Control<TFormValues>;
  name: string;
  label: string;
  inputComponent?: "Search" | "TextArea" | "Password" | "OTP";
}

export function InputField<
  TFormValues extends FieldValues = Record<string, unknown>
>({
  control,
  name,
  label,
  inputComponent,
  ...props
}: InputFieldProps<TFormValues>) {
  const InputComponent = inputComponent ? Input[inputComponent] : Input;
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
          <InputComponent {...field} {...props} />
        </Form.Item>
      )}
    />
  );
}
