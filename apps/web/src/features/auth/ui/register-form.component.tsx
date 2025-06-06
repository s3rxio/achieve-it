import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { registerSchema, useAppForm } from "../../../shared/libs/zod";
import { InputField } from "../../../shared/ui";
import { useRegister } from "../hooks/use-register.hook";
import { useAuthStore } from "../model/auth.store";

export const RegisterForm = () => {
  const { control, handleSubmit } = useAppForm(registerSchema);
  const { setTokens } = useAuthStore();

  const registerMutation = useRegister();
  const navigate = useNavigate();

  const onSubmit = async (data: { username: string; password: string }) => {
    registerMutation.mutate(data, {
      onSuccess: data => {
        setTokens(data.accessToken, data.refreshToken);
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField control={control} name="username" label="Логин" />
      <InputField
        control={control}
        name="password"
        label="Пароль"
        type="password"
      />
      <Button htmlType="submit">Войти</Button>
    </form>
  );
};
