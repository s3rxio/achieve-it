import { Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { LoginForm } from "../../../features/auth";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  gap: "1rem"
});

export const LoginPage: FC = () => {
  return (
    <Container>
      <Typography.Title>Вход</Typography.Title>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
