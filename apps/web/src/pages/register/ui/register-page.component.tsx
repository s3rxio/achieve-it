import { Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { RegisterForm } from "../../../features/auth";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  gap: "1rem"
});

export const RegisterPage: FC = () => {
  return (
    <Container>
      <Typography.Title>Регистрация</Typography.Title>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
