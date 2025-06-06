import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { loginSchema, useAppForm } from "../../../shared/libs/zod";
import { InputField } from "../../../shared/ui";
import { useLogin } from "../hooks/use-login.hook";
import { useAuthStore } from "../model/auth.store";

export const LoginForm = () => {
  const { control, handleSubmit } = useAppForm(loginSchema);
  const { setTokens } = useAuthStore();

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data: { username: string; password: string }) => {
    loginMutation.mutate(data, {
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
