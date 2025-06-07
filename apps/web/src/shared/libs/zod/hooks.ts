import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { TypeOf, ZodSchema } from "zod";

export const useAppForm = <T extends ZodSchema>(
  schema: T,
  options?: UseFormProps<TypeOf<T>>
) => {
  const form = useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    ...options
  });

  return form;
};
